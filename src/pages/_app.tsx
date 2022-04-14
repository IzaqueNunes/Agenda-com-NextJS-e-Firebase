import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import DefaultTheme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={DefaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
