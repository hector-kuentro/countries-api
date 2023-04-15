'use client'

import { FC } from 'react'
import styles from './TopBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faMoon as faMoonRegular } from '@fortawesome/free-regular-svg-icons'
import Button from '../Buttons/Button'
import { useThemeContext } from '@/context/ThemeContext'
import { Theme } from '@/context/theme.types'

const TopBar: FC = () => {

    const { theme, toggleTheme } = useThemeContext()

    return (
        <div className={styles.topBar}>
            <h1>Where in the world?</h1>

            <Button
                variant='text'
                onClick={toggleTheme}
            >
                <FontAwesomeIcon icon={theme === Theme.DARK ? faMoon : faMoonRegular} />
                {theme === Theme.DARK ? 'Light Mode' : 'Dark Mode'}
            </Button>
        </div>
    )
}

export default TopBar
