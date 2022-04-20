import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../contexts/AuthContext'
import { auth, signOut } from '../../../services/firebase'

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Portal,
  useToast
} from '@chakra-ui/react'
import { PopoverTrigger } from '@chakra-ui/popover'
import MenuDrawer from '../drawer/MenuDrawer'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { setIsSignedIn, user } = useContext(AuthContext)
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
          description: error.message,
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
          <Popover>
            <PopoverTrigger>
              <Avatar size="sm" mr={2} cursor="pointer">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Olá {user}</PopoverHeader>
                <PopoverCloseButton />
                <PopoverFooter>
                  <Button
                    padding={0}
                    leftIcon={<ArrowBackIcon />}
                    backgroundColor="transparent"
                    _hover={{ backgroundColor: 'transparent' }}
                    onClick={handleLogOut}
                  >
                    Sair
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default Header
