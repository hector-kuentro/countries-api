import { NextResponse } from 'next/server'
import data from '../../../../data.json'

async function getCountryByName(name: string) {
    try {
        name = name.toLowerCase()
        const country = await data.find(item => item.name.toLowerCase() === name)
        return country
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
