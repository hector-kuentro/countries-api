import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './Buttons.module.scss'

type Variants = 'text' | 'filled'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variants
}

const Button: FC<Props> = ({ variant, ...props }) => {

    if (variant === 'text') return (
        <button
            className={clsx(styles.textButton, props.className)}
            {...props}
        >
            {props.children}
        </button>
    )

    return (
        <button
            className={clsx(styles.filledButton, props.className)}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button