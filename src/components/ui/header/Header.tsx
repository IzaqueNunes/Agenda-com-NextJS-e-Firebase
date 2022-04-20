import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, Heading } from '@chakra-ui/react'
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
      backgroundColor="gray.800"
      alignItems="center"
    >
      <Grid
        as="main"
        width="100%"
        height="100%"
        templateColumns="1fr 1fr"
        templateRows="100%"
        templateAreas="
        'menu out'
    "
        alignItems="center"
      >
        <Flex gridArea="menu" pl={4} justifyContent="flex-start">
          <MenuDrawer />
          <Heading color="#fff">{title}</Heading>
        </Flex>

        <Flex gridArea="out" pr={4} justifyContent="flex-end">
          <Button
            leftIcon={<ArrowBackIcon />}
            backgroundColor="transparent"
            color="#fff"
            _hover={{ backgroundColor: 'transparent' }}
          >
            Sair
          </Button>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default Header
