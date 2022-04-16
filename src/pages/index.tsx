import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { IoLogoGithub } from 'react-icons/io'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

import {
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useToast
} from '@chakra-ui/react'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const toast = useToast()

  const login = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user

        setTimeout(() => {
          router.push('/home')
          setLoading(false)
        }, 3000)
        // ...
      })
      .catch(error => {
        setLoading(false)

        toast({
          position: 'top',
          description: 'Email ou senha incorreta',
          status: 'error',
          duration: 3000
        })
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return (
    <Grid
      as="main"
      height="100vh"
      backgroundColor="gray.800"
      templateColumns="1fr 480px 480px 1fr"
      templateRows="1fr 480px 1fr"
      templateAreas="
          '. . . .'
          '. logo form .'
          '. . . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      <Flex gridArea="logo" flexDir="column" alignItems="flex-start">
        <Image
          src="https://desencoder.com.br/wp-content/uploads/2020/03/logo-blank.svg"
          alt="Desencoder"
          boxSize="150px"
        />
        <Heading size="2xl" color="#fff" lineHeight="shorter" marginTop={8}>
          Faça seu login no EventApp!
        </Heading>
      </Flex>

      <Flex
        gridArea="form"
        height="100%"
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={16}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="purple.500" />}
            height="50px"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </InputGroup>

        <InputGroup marginTop={8}>
          <InputLeftElement
            pointerEvents="none"
            children={<LockIcon color="purple.500" />}
            height="50px"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            type="password"
            placeholder="Senha"
            color="#fff"
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </InputGroup>

        <Link
          alignSelf="flex-start"
          marginTop={2}
          fontSize="sm"
          color="purple.600"
          fontWeight="bold"
          _hover={{ color: 'purple.500' }}
        >
          Esqueci minha senha
        </Link>
        <Button
          marginTop={6}
          backgroundColor="purple.500"
          height="50px"
          borderRadius="sm"
          _hover={{ backgroundColor: 'purple.600' }}
          color="#fff"
          onClick={login}
          isLoading={loading}
        >
          ENTRAR
        </Button>

        <Text textAlign="center" fontSize="sm" color="gray.300" marginTop={6}>
          Não tem uma conta?{' '}
          <Link
            alignSelf="flex-start"
            marginTop={2}
            fontSize="sm"
            color="purple.600"
            fontWeight="bold"
            _hover={{ color: 'purple.500' }}
            href="/register"
          >
            Registre-se
          </Link>
        </Text>

        <Divider mt={2} />

        <Flex alignItems="center" mt={4}>
          <Text fontSize="sm" color="gray.300">
            Ou entre com
          </Text>
          <Button
            height="50px"
            flex="1"
            backgroundColor="gray.600"
            borderRadius="sm"
            marginLeft={6}
            _hover={{ backgroundColor: 'purple.500' }}
            color="#fff"
            leftIcon={<IoLogoGithub color="purple.500" />}
          >
            GITHUB
          </Button>
        </Flex>
      </Flex>
    </Grid>
  )
}

export default Login
