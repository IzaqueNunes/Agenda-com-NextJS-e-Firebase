import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../contexts/AuthContext'
import { auth, signOut } from '../../../services/firebase'

import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, Heading, useToast } from '@chakra-ui/react'
import MenuDrawer from '../drawer/MenuDrawer'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { setIsSignedIn } = useContext(AuthContext)
  const router = useRouter()
  const toast = useToast()

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false)
        toast({
          position: 'top',
          description: 'Você foi deslogado com sucesso',
          status: 'success',
          duration: 3000
        })
        setTimeout(() => {
          router.push('/')
        }, 3000)
      })
      .catch(error => {
        toast({
          position: 'top',
          description: 'Houve um erro ao deslogar',
          status: 'error',
          duration: 3000
        })
      })
  }

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
            onClick={handleLogOut}
          >
            Sair
          </Button>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default Header
