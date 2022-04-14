import React from 'react'
import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

const Home: React.FC = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue('gray.100', 'gray.700')

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          placeholder="email@email.com"
          variant="flushed"
          mb={3}
          type="email"
        />
        <Input placeholder="senha" variant="flushed" mb={3} type="password" />
        <Button mb={6} colorScheme="teal">
          Entrar
        </Button>
        <Button onClick={toggleColorMode}>Alterar tema</Button>
      </Flex>
    </Flex>
  )
}

export default Home
