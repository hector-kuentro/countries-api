import { NextResponse } from 'next/server'
import data from '../../../../data.json'

async function getCountryByName(name: string) {
    try {
        name = name.toLowerCase()
        let borders: Array<string | undefined> = []
        const country = await data.find(item => item.name.toLowerCase() === name)
        
        if(!country) throw new Error('Country not found')

        country?.borders?.forEach(async border => {
            const item = await data.find(item => item.alpha3Code === border)
            borders.push(item?.name)
        })
        return { ...country, borders }
    } catch (err) {
        throw new Error('Country not found')
    }
}

export async function GET(_request: Request, { params }: { params: { name: string } }) {
    const countryName = params.name
    try {
        const country = await getCountryByName(countryName)
        return NextResponse.json(country)
    } catch (err) {
        return NextResponse.json({ error: `Error requesting country: ${countryName}` })
    }
}
