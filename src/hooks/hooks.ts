import { isValidString } from '@/helpers/validations'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounce = (value: string, time: number = 250) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, time)

        return () => {
            clearTimeout(timeout)
        }
    }, [value, time])

    return debounceValue
}

function debounce(fn: () => void, ms: number) {
    let timer: any
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn()
        }, ms)
    }
}

interface UseIsMobileParams {
    limit?: number;
}

export const useIsMobile = ({ limit }: UseIsMobileParams) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth <= (limit || 600))
    }, [])

    useEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setIsMobile(window.innerWidth <= (limit || 600))
        }, 500)

        window.addEventListener('resize', debouncedHandleResize)

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return isMobile
}

interface UseIntersectionObserverParams {
    onEntering?: () => void
    onLeaving?: () => void
    disabled?: boolean
    options?: IntersectionObserverInit
}

export const useIntersectionObserver = ({ onEntering, onLeaving, disabled, options = {} }: UseIntersectionObserverParams) => {
    const [isVisible, setIsVisible] = useState(false)
    const observer = useRef<any>()
    const ref = useCallback((node: any) => {
        if (disabled) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true)
                if (onEntering) onEntering()
            }
            if (!entries[0].isIntersecting) {
                setIsVisible(false)
                if (onLeaving) onLeaving()
            }
        }, options)
        if (node) observer.current.observe(node)
    }, [disabled])

    return { ref, isVisible }
}

export const useIsValidString = (value: string) => {
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        setIsValid(isValidString(value))
    }, [value])

    return isValid
}