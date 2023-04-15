import CountryPage from '@/components/CountryPage/CountryPage'
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import data from '../data.json'

export default CountryPage

interface Props {
    country?: Partial<Country>
    notFound?: boolean
    countryName?: string
}

export async function getStaticProps({ params }: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    const param = !!params ? params.countryName as string : ''
    const countryName = param.toLowerCase()

    const country = data.find(item => item.name.toLowerCase() === countryName)

    if(!country) return {
        props: {
            country: {},
            notFound: true, 
            countryName: param
        }
    }

    return { props: { country } }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const paths = data.map(country => ({ params: { countryName: country.name.toLowerCase() } }))

    return {
        paths,
        fallback: 'blocking'
    }
}