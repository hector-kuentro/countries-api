'use client'

import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import Input from '../Inputs/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchBar.module.scss'
import { useDebounce, useIsValidString } from '@/hooks/hooks'
import { isValidString } from '@/helpers/validations'
import clsx from 'clsx'
import Loader from '../Loaders/Loader'

let isDeleting = false

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    onSearch: (searchValue: string) => void
    value?: string
    loading?: boolean
}

const SearchBar: FC<Props> = ({ onSearch, loading, ...props }) => {

    // States
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState(props.value || '')
    const [isReadOnly, setIsReadOnly] = useState(true)

    // Hooks
    const debouncedValue = useDebounce(value)
    const hasText = useIsValidString(value)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleOnKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase()
        isDeleting = key.includes('backspace') || key.includes('delete')
    }

    const toggleIsFocused = () => {
        setIsFocused(prev => !prev)
        setIsReadOnly(prev => !prev)
    }

    const handleClear = () => {
        setValue('')
        onSearch('')
        if (inputRef.current) inputRef.current.focus()
    }

    useEffect(() => {
        if (!isValidString(debouncedValue) && !isDeleting) return
        onSearch(debouncedValue)
    }, [debouncedValue])

    return (
        <div className={clsx(styles.container, isFocused && styles.focused)}>
            <FontAwesomeIcon icon={faSearch} />
            <Input
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                onFocus={toggleIsFocused}
                onBlur={toggleIsFocused}
                readOnly={isReadOnly}
                value={value}
                ref={inputRef}
                placeholder='Search for a country...'
                {...props}
            />
            {loading
                ? <Loader />
                : <FontAwesomeIcon
                    icon={faClose}
                    className={clsx(hasText && styles.clearButtonVisible)}
                    onClick={handleClear}
                />}
        </div>
    )
}

export default SearchBar