import CountryNotFound from '@/components/CountryNotFound/CountryNotFound'
import CountryPage from '@/components/CountryPage/CountryPage'
import { requestCountry } from '@/services/countries.service'
import { Metadata } from 'next'

interface Params {
    params: {
        countryName: string
    }
}

export default async function page({ params }: Params) {
    const country = await requestCountry(params.countryName)

    if (country.error) return (
        <CountryNotFound countryName={params.countryName}/>
    )

    return (
        <CountryPage country={country} />
    )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const country = await requestCountry(params.countryName)
    if (country.error) return {
        title: 'Not found'
    }
    return { title: country.name }
}