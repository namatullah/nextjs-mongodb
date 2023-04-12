import Header from '../components/header/Header'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <div style={{ margin: '23px' }}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
