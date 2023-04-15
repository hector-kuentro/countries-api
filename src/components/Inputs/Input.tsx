import { FC, ForwardRefRenderFunction, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import styles from './Inputs.module.scss'
import clsx from 'clsx'

const Input: ForwardRefRenderFunction<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>> = (props) => {

    return (
        <input
            className={clsx(styles.text, props.className)}
            {...props}
        />
    )
}

export default forwardRef(Input)