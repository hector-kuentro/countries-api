import Countries from '@/components/Countries/Countries'
import { GetStaticPropsResult } from 'next'
import data from '../data.json'

export default Countries

interface Props {
    countries: CountriesList
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {

    return { props: { countries: data } }
}