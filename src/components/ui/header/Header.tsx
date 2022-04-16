import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import MenuDrawer from '../drawer/MenuDrawer'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Flex
      width="100%"
      height="10vh"
      direction="row"
      backgroundColor="gray.900"
      alignItems="center"
    >
      <MenuDrawer />
      <Heading size="sm">{title}</Heading>
    </Flex>
  )
}

export default Header
