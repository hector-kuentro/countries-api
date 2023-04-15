export let BODY_ELEMENT: HTMLBodyElement

export function setBodyElement() {
    BODY_ELEMENT = document.querySelector('body') as HTMLBodyElement
}

const formatter = new Intl.NumberFormat('en')

export function getFormattedNumber(value: number | string) {
    if (typeof value === 'string') value = parseFloat(value)
    return formatter.format(value)
}