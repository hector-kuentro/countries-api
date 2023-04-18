import clsx from 'clsx'
import { ButtonHTMLAttributes, ForwardRefRenderFunction, forwardRef } from 'react'
import styles from './Buttons.module.scss'

type Variants = 'text' | 'filled' | 'icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variants
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({ variant, ...props }, ref) => {

    const {className, ...rest} = props

    if (variant === 'text') return (
        <button
            className={clsx(styles.textButton, className)}
            {...rest}
            ref={ref}
        >
            {props.children}
        </button>
    )
    
    if (variant === 'icon') return (
        <button
            className={clsx(styles.iconButton, className)}
            {...rest}
            ref={ref}
        >
            {props.children}
        </button>
    )

    return (
        <button
            className={clsx(styles.filledButton, className)}
            {...rest}
            ref={ref}
        >
            {props.children}
        </button>
    )
}

export default forwardRef(Button)