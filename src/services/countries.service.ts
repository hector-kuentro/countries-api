const { API_URL } = process.env

export async function requestCountries() {
    const response = await fetch(`${API_URL}/countries`)
    const countries: CountriesList = await response.json()
    return countries
}

export async function requestCountry(countryName: string) {
    const response = await fetch(`${API_URL}/countries/${countryName}`)
    const country: Country & { error: string } = await response.json()
    return country
}

export async function requestSearchCountries(searchValue: string, callback: (countries: CountriesList) => void) {
    const response = await fetch(`${API_URL}/countries?s=${searchValue}`)
    const data: CountriesList = await response.json()
    callback(data)
}

export async function requestCountriesByRegion(region: string, callback: (countries: CountriesList) => void) {
    const query = region === 'All' ? '' : `?r=${region}`
    const response = await fetch(`${API_URL}/countries${query}`)
    const data: CountriesList = await response.json()
    callback(data)
}