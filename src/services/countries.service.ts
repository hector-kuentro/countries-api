export async function requestCountries() {
    const response = await fetch('http://localhost:3000/api/countries')
    const countries: CountriesList = await response.json()
    return countries
}

export async function requestCountry(countryName: string) {
    const response = await fetch(`http://localhost:3000/api/countries/${countryName}`)
    const country: Country & { error: string } = await response.json()
    return country
}

export async function requestSearchCountries(searchValue: string, callback: (countries: CountriesList) => void) {
    const response = await fetch(`http://localhost:3000/api/countries?s=${searchValue}`)
    const data: CountriesList = await response.json()
    callback(data)
}

export async function requestCountriesByRegion(region: string, callback: (countries: CountriesList) => void) {
    const query = region === 'All' ? '' : `?r=${region}`
    const response = await fetch(`http://localhost:3000/api/countries${query}`)
    const data: CountriesList = await response.json()
    callback(data)
}