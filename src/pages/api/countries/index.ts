import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../data.json'

interface SearchParams {
  searchValue: string
  region: string
}

async function searchCountries({ searchValue, region }: SearchParams) {
  const value = searchValue.toLowerCase().trim()
  const paramRegion = region.toLowerCase().trim()
  const regex = new RegExp(value || '', 'i')
  const regionRegex = new RegExp(paramRegion || '', 'i')

  const result = data.filter(item => {
    const countryName = item.name.toLowerCase().trim()
    const countryRegion = item.region.toLowerCase().trim()
    return countryName.match(regex) && countryRegion.match(regionRegex)
  })

  return result || []
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const searchValue = req.query.s as string
  const region = req.query.r as string
  
  if (searchValue || region) {
    const countries = await searchCountries({
      searchValue: searchValue || '',
      region: region || ''
    })

    return res.json(countries)
  }

  return res.json(data)
}
