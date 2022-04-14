import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import MenuDrawer from '../utils/drawer/MenuDrawer'

const HomePage: React.FC = () => {
  return (
    <Flex
      height="100vh"
      backgroundColor="gray.800"
      alignItems="center"
      justifyContent="center"
    >
      <Heading color="#fff">Home</Heading>
      <MenuDrawer />
    </Flex>
  )
}

export default HomePage
