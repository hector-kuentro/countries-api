export const isValidString = (value: any) => {
    return undefined !== value && !!value && value.replace(/\s/g, '').length > 0
}