import './globals.css'


import AuthContextProvider from './context/AuthContext';


import Providers from './redux/provider';


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
          <AuthContextProvider>
            <Providers>
              {children}
            </Providers>
          </AuthContextProvider>
      </body>
    </html>
  )
}