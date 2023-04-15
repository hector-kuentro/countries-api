import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState, MouseEvent } from 'react'
import styles from './Inputs.module.scss'
import clsx from 'clsx'
import { useIntersectionObserver } from '@/hooks/hooks'
import Loader from '../Loaders/Loader'

const VALUES = [
    'All', 'Africa', 'America',
    'Asia', 'Europe', 'Oceania'
]

let isOpened = false

const closeOnEscapeListener = (callback: () => void) => (e: KeyboardEvent) => {
    const isEscape = e.key === 'Escape'
    if (isEscape && isOpened) callback()
}

interface Props {
    loading?: boolean
    onChange: (region: string) => void
}

const Select: FC<Props> = ({ onChange, loading }) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>('All')

    useEffect(() => {
        document.addEventListener('keydown', closeOnEscapeListener(toggleMenu))
    }, [])

    function toggleMenu() {
        setOpen(prev => !prev)
        isOpened = !isOpened
    }

    function handleChange(e: MouseEvent<HTMLOptionElement>) {
        console.log('event: ', e)
        setValue(e.target.value)
        onChange(e.target.value)
    }

    const observer = useIntersectionObserver({
        onLeaving: () => {
            setOpen(false)
            isOpened = false
        }
    })

    return (
        <div
            className={clsx(styles.select, open && styles.opened)}
            onClick={toggleMenu}
            ref={observer}
        >
            <div>
                Filter by Region{value !== 'All' && ': '}
                {value !== 'All' && <span>{value}</span>}
                {loading
                    ? <Loader style={{
                            position: 'absolute',
                            inset: 'auto 1rem auto auto'
                        }} />
                    : <FontAwesomeIcon icon={faChevronDown} />
                }
            </div>

            <section>
                {VALUES.map(value => (
                    <option
                        key={value}
                        value={value}
                        onClick={handleChange}
                    >
                        {value}
                    </option>
                ))}
            </section>
        </div>
    )
}

export default Select