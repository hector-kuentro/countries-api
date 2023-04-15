import { FC } from 'react'
import styles from './CountryCard.module.scss'
import { getFormattedNumber } from '@/helpers/utils'
import Link from 'next/link'

interface Props {
    country: Country
}

const CountryCard: FC<Props> = ({ country }) => {

    const flag = !!country.flags ? country.flags.svg || country.flags.png : null

    return (
        <Link
            href={`/${country.name}`}
            className={styles.card}
        >
            <section
                className={styles.imageContainer}
                style={{
                    backgroundImage: `url(${flag})`,
                    backgroundColor: flag ? 'unset' : 'var(--gray)'
                }}>
            </section>

            <section className={styles.cardInfo}>
                <span>{country.name}</span>

                <div>
                    <p>
                        <span>Population:</span>
                        {getFormattedNumber(country.population)}
                    </p>
                    <p>
                        <span>Region:</span>
                        {country.region}
                    </p>
                    <p>
                        <span>Capital:</span>
                        {country.capital}
                    </p>
                </div>
            </section>
        </Link>
    )
}

export default CountryCard