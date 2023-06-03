import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default App
