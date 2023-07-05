import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typing'
import { movieRequests } from '../utils/requests'
import useList from '../hooks/useList'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  const { user, loading } = useAuth()
  const showModal = useRecoilValue(modalState)
  // const subscriptions = false
  // const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  if (loading) return null

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix | Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

// server side rendering code
export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(movieRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(movieRequests.fetchTrending).then((res) => res.json()),
    fetch(movieRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchActionMovies).then((res) => res.json()),
    fetch(movieRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(movieRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(movieRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(movieRequests.fetchDocumentaries).then((res) => res.json()),
  ])

  netflixOriginals.results.forEach((content: Movie) => (content.type = 'movie'))
  trendingNow.results.forEach((content: Movie) => (content.type = 'movie'))
  topRated.results.forEach((content: Movie) => (content.type = 'movie'))
  actionMovies.results.forEach((content: Movie) => (content.type = 'movie'))
  comedyMovies.results.forEach((content: Movie) => (content.type = 'movie'))
  horrorMovies.results.forEach((content: Movie) => (content.type = 'movie'))
  romanceMovies.results.forEach((content: Movie) => (content.type = 'movie'))
  documentaries.results.forEach((content: Movie) => (content.type = 'movie'))

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
