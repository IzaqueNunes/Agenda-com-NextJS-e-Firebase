import { Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import Header from '../header/Header'

interface HeaderProps {
  title: string
  children: React.ReactNode
  icon?: string
}

const Layout: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <Grid
      as="main"
      height="100vh"
      width="100%"
      backgroundColor="gray.800"
      position="relative"
    >
      <Flex gridArea="header">
        <Header title={title} />
      </Flex>
      <Flex gridArea="children">{children}</Flex>
    </Grid>
  )
}

export default Layout
