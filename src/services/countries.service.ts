import getConfig from 'next/config'

const isInBrowser = typeof window !== 'undefined'

const { serverRuntimeConfig, } = getConfig()

const prefix = isInBrowser ? process.env.NEXT_PUBLIC_API_URL : serverRuntimeConfig.NEXT_PUBLIC_API_URL

export async function requestCountries() {
    const response = await fetch(`${prefix}countries`)
    const countries: CountriesList = await response.json()
    return countries
}

export async function requestCountry(countryName: string) {
    const response = await fetch(`${prefix}countries/${countryName}`)
    const country: Country & { error: string } = await response.json()
    return country
}

export async function requestSearchCountries(searchValue: string, callback: (countries: CountriesList) => void) {
    const response = await fetch(`${prefix}countries?s=${searchValue}`)
    const data: CountriesList = await response.json()
    callback(data)
}

export async function requestCountriesByRegion(region: string, callback: (countries: CountriesList) => void) {
    const query = region === 'All' ? '' : `?r=${region}`
    const response = await fetch(`${prefix}countries${query}`)
    const data: CountriesList = await response.json()
    callback(data)
}