interface Currency {
    code: string
    name: string
    symbol: string
}

interface Language {
    name: string
}

interface Country {
    name: string
    topLevelDomain: string
    capital: string
    population: number
    region: string
    subregion: string
    flags: {
        png: string,
        svg: string
    },
    borders: Array<string>
    nativeName: string
    currencies: Array<Currency>
    languages: Array<Language>
}

type CountriesList = Array<Country>