'use client'

import { FC } from 'react'
import styles from './CountryPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Button from '../Buttons/Button'
import { useRouter } from 'next/navigation'
import Image from '../Image/Image'
import { getFormattedNumber } from '@/helpers/utils'
import Link from 'next/link'
import CountryNotFound from '../CountryNotFound/CountryNotFound'

interface Props {
    country: Country
    notFound?: boolean
    countryName: string
}

const CountryPage: FC<Props> = ({ country, notFound, countryName }) => {

    const router = useRouter()

    if (notFound) return <CountryNotFound countryName={countryName} />

    const domains = country.topLevelDomain || []
    const borders = country.borders || []
    const currencies = country.currencies || []
    const languages = country.languages || []
    const flag = !!country.flags ? country.flags.svg || country.flags.png : ''

    function handleGoBack() {
        router.back()
    }

    return (
        <main className={styles.main}>
            <Button onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </Button>

            <section className={styles.container}>
                <Image
                    src={flag}
                    width={400}
                    height={200}
                    alt={country.name}
                />

                <div className={styles.countryInfo}>
                    <h1>{country.name}</h1>

                    <div className={styles.countryDetails}>
                        <p>Native Name: <span>{country.nativeName}</span></p>
                        <p>Population: <span>{getFormattedNumber(country.population)}</span></p>
                        <p>Region: <span>{country.region}</span></p>
                        <p>Region: <span>{country.subregion}</span></p>
                        <p>Capital: <span>{country.capital}</span></p>

                        <div className={styles.currencies}>
                            <span>Top Level Domain:</span>
                            <div>
                                {domains.map(domain => (
                                    <span key={domain}>
                                        {domain}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.currencies}>
                            <span>Currencies:</span>
                            <div>
                                {currencies.map(currency => (
                                    <span key={currency.code}>
                                        {currency.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.languages}>
                            <span>Languages:</span>
                            <div>
                                {languages.map(language => (
                                    <span key={language.name}>
                                        {language.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.borders}>
                        <span>Border Countries:</span>
                        <div>{borders.map(border => (
                            <Link
                                href={`/${border}`}
                                key={border}
                            >
                                {border}
                            </Link>
                        ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CountryPage