import './globals.css'

// import AuthContextProvider from './context/AuthContext';

import Providers from './redux/provider';
import { Toaster } from 'react-hot-toast';
import ActiveStatus from './components/ActiveStatus';

export default async function RootLayout({
  children,
}){
  
  return (
    <html lang="en">
      <head>
       <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/> 
      </head>
      <body>
      <Providers>
          <Toaster/>
          <ActiveStatus/>
            {children}
        </Providers>
      </body>
    </html>
  )
}