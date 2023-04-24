import Head from 'next/head'
import Homepage from '../components/Home'

export default function Home(): JSX.Element {
  return (
    <>
    <Head>
      <title>Moodly</title>
    </Head>
    <main>
      <Homepage />
    </main>
    </>
  )
}
