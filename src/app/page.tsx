
// import { Inter } from 'next/font/google'
import Countries from '@/components/Countries/Countries'
import styles from './page.module.scss'
import { requestCountries } from '@/services/countries.service'

// const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  // return <MainLoader/>

  const countries = await requestCountries()

  return (
      <main className={styles.main}>
        <Countries
          countries={countries}
        />
      </main>
  )
}