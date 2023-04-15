'use client'

import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Theme } from './theme.types'
import { LOCAL_STORAGE_ITEMS } from '@/constants/constants'
import { BODY_ELEMENT, setBodyElement } from '@/helpers/utils'

interface Props {
    children: ReactNode
}

interface ContextModel {
    theme: Theme
    toggleTheme: () => void
}

const initState: ContextModel = {
    theme: Theme.LIGHT,
    toggleTheme: () => { }
}

const ThemeContext = createContext<ContextModel>(initState)

const ThemeContextProvider: FC<Props> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>(initState.theme)

    useEffect(() => {
        const localTheme = localStorage.getItem(LOCAL_STORAGE_ITEMS.THEME)

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme) {
            updateTheme(Theme.DARK)
            return
        }

        localTheme ?
            updateTheme(localTheme as Theme) :
            updateTheme(Theme.LIGHT)
    }, [])

    function updateTheme(value: Theme) {
        setTheme(value)
        if (!BODY_ELEMENT) setBodyElement()
        if (value === Theme.DARK) {
            BODY_ELEMENT.classList.add(Theme.DARK)
        } else {
            BODY_ELEMENT.classList.remove(Theme.DARK)
        }
    }

    function toggleTheme() {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        localStorage.setItem(LOCAL_STORAGE_ITEMS.THEME, newTheme)
        updateTheme(newTheme)
    }

    return (
        <ThemeContext.Provider value={{
            theme, toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)

export default ThemeContextProvider