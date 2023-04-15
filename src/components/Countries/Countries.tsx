'use client'

import { FC, useLayoutEffect, useRef, useState } from 'react'
import CountryCard from '../CountryCard/CountryCard'
import styles from './Countries.module.scss'
import mainStyles from '../../pages/app.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import Select from '../Inputs/Select'
import { requestCountriesByRegion, requestSearchCountries } from '@/services/countries.service'

interface Props {
    countries: CountriesList
}

let lastScroll = 0

const Countries: FC<Props> = (props) => {

    const [countries, setCountries] = useState(props.countries)
    // const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [filterLoading, setFilterLoading] = useState(false)

    const isScrollDone = useRef(false)

    useLayoutEffect(() => {
        if (!isScrollDone.current) {
            window.scrollTo({ top: lastScroll })
            isScrollDone.current = true
        }

        return () => {
            lastScroll = window.scrollY
        }
    }, [])

    async function handleSearch(searchValue: string) {
        setLoading(true)
        await requestSearchCountries(searchValue, setCountries)
        setLoading(false)
    }

    async function handleRegionChange(region: string) {
        setFilterLoading(true)
        await requestCountriesByRegion(region, setCountries)
        setFilterLoading(false)
    }

    return (
        <main className={mainStyles.main}>
            <div className={styles.container}>
                <section className={styles.inputsContainer}>
                    <SearchBar
                        onSearch={handleSearch}
                        loading={loading}
                    />

                    <Select
                        onChange={handleRegionChange}
                        loading={filterLoading}
                    />
                </section>

                <section className={styles.list}>
                    {countries.map(country => (
                        <CountryCard
                            key={country.name}
                            country={country}
                        />
                    ))}
                </section>
            </div>
        </main>
    )
}

export default Countries