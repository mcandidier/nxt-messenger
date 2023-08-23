import '../app/globals.css'
import { Toaster } from 'react-hot-toast';

import RootLayout from '@/app/layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster/>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  )
}