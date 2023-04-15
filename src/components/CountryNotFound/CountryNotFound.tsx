'use client'

import { FC } from 'react'
import styles from './CountryNotFound.tsx.module.scss'
import Button from '../Buttons/Button'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    countryName: string
}

const CountryNotFound: FC<Props> = ({ countryName }) => {

    const router = useRouter()

    function handleGoBack() {
        router.back()
    }

    return (
        <div className={styles.container}>
            <span>Oops!</span>
            <p>We couldn&apos;t find {countryName}</p>

            <Button onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                Go back
            </Button>
        </div>
    )
}

export default CountryNotFound