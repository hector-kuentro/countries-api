let HTML_ELEMENT: HTMLHtmlElement
export let BODY_ELEMENT: HTMLBodyElement

export function setBodyElement() {
    BODY_ELEMENT = document.querySelector('body') as HTMLBodyElement
}

const formatter = new Intl.NumberFormat('en')

export function getFormattedNumber(value: number | string) {
    if (typeof value === 'string') value = parseFloat(value)
    return formatter.format(value)
}

export function scrollTo(options: ScrollToOptions){
    if(!HTML_ELEMENT) HTML_ELEMENT = document.querySelector('html') as HTMLHtmlElement
    HTML_ELEMENT.scrollTo(options)
}