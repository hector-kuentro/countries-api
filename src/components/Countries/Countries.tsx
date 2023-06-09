'use client'

import { FC, useLayoutEffect, useRef, useState } from 'react'
import CountryCard from '../CountryCard/CountryCard'
import styles from './Countries.module.scss'
import mainStyles from '../../pages/app.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import Select from '../Inputs/Select'
import { requestCountriesByRegion, requestSearchCountries } from '@/services/countries.service'
import Button from '../Buttons/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { scrollTo } from '@/helpers/utils'
import { useIntersectionObserver } from '@/hooks/hooks'
import { isValidString } from '@/helpers/validations'

interface Props {
    countries: CountriesList
}

let lastScroll = 0

const Countries: FC<Props> = (props) => {

    const [countries, setCountries] = useState(props.countries)
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [filterLoading, setFilterLoading] = useState(false)

    const hasResults = countries.length > 0
    const isSearch = isValidString(searchValue)

    const isScrollDone = useRef(false)
    const fabRef = useRef<HTMLButtonElement>(null)
    const { ref: inputsContainerRef } = useIntersectionObserver({
        onEntering: () => fabRef.current?.classList.remove(styles.goUpButtonVisible),
        onLeaving: () => fabRef.current?.classList.add(styles.goUpButtonVisible),
    })

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
        setSearchValue(searchValue)
        await requestSearchCountries(searchValue, setCountries)
        setLoading(false)
    }

    async function handleRegionChange(region: string) {
        setFilterLoading(true)
        await requestCountriesByRegion(region, setCountries)
        setFilterLoading(false)
    }

    return (
        <>
            <main className={mainStyles.main}>
                <div className={styles.container}>
                    <section
                        className={styles.inputsContainer}
                        ref={inputsContainerRef}
                    >
                        <SearchBar
                            onSearch={handleSearch}
                            loading={loading}
                        />

                        <Select
                            onChange={handleRegionChange}
                            loading={filterLoading}
                        />
                    </section>

                    {isSearch && !hasResults &&
                        <NoContent searchValue={searchValue} />
                    }

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

            <Button
                variant='icon'
                className={styles.goUpButton}
                title='Go up'
                onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
                ref={fabRef}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </Button>
        </>
    )
}

const NoContent: FC<{ searchValue: string }> = ({ searchValue }) => {
    return (
        <div className={styles.noResults}>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>No results matches <span>&quot;{searchValue}&quot;.</span></span>
            <p>Please, try another search.</p>
        </div>
    )
}

export default Countries