import { FC, HTMLAttributes } from 'react'
import styles from './Loader.module.scss'
import clsx from 'clsx'

interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'main' | 'normal'
}

const Loader: FC<Props> = ({variant, ...props}) => {

    if(variant === 'main') return (
        <span
            className={clsx(styles.main, props.className)}
            {...props}
        />
    )

    return (
        <span
            className={clsx(styles.loader, props.className)}
            {...props}
        />
    )
}

export default Loader