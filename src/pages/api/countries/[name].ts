import data from '../../../data.json'
import { NextApiRequest, NextApiResponse } from 'next'

async function getCountryByName(name: string) {
    try {
        name = name.toLowerCase()
        let borders: Array<string | undefined> = []
        const country = await data.find(item => item.name.toLowerCase() === name)

        if (!country) throw new Error('Country not found')

        country?.borders?.forEach(async border => {
            const item = await data.find(item => item.alpha3Code === border)
            borders.push(item?.name)
        })
        return { ...country, borders }
    } catch (err) {
        throw new Error('Country not found')
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const countryName = req.query.name as string
    try {
        const country = await getCountryByName(countryName)
        return res.json(country)
    } catch (err) {
        return res.status(500).json({ error: `Error requesting country: ${countryName}` })
    }
}
