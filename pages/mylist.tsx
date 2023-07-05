import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'

const mylist = () => {
  const { user, loading } = useAuth()
  const showModal = useRecoilValue(modalState)
  const list = useList(user?.uid)

  if (loading) return null

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix | mylist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <section className="md:space-y-24">
          {/* My List */}
          <div className="mt-32">
            {list.length > 0 && <Row title="My List" movies={list} />}
          </div>
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default mylist
