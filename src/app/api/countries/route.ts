import { NextResponse, NextRequest } from 'next/server'
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

export async function GET(request: NextRequest) {
  const searchValue = request.nextUrl.searchParams.get('s')
  const region = request.nextUrl.searchParams.get('r')
  console.log('Query: ', request.nextUrl.searchParams)

  if (searchValue || region) {
    const countries = await searchCountries({
      searchValue: searchValue || '',
      region: region || ''
    })
    return NextResponse.json(countries)
  }

  return NextResponse.json(data)
}
