import './globals.css'


import AuthContextProvider from './context/AuthContext';


import Providers from './redux/provider';
import { Toaster } from 'react-hot-toast';
import ActiveStatus from './components/ActiveStatus';


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
          <AuthContextProvider>
            <Toaster/>
            <ActiveStatus></ActiveStatus>
            <Providers>
              {children}
            </Providers>
          </AuthContextProvider>
      </body>
    </html>
  )
}