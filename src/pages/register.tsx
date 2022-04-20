import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useToast
} from '@chakra-ui/react'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toast = useToast()

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      setLoading(true)
      // Signed in
      const user = userCredential.user
      toast({
        position: 'top',
        description: 'Cadastro efetuado com sucesso',
        duration: 3000
      })
      setTimeout(() => {
        setLoading(false)

        router.push('/')
      }, 2000)
      // ...
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })

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
          Faça seu Registro no EventApp!
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
        onSubmit={() => createUserWithEmailAndPassword}
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

        <Button
          marginTop={6}
          backgroundColor="purple.500"
          height="50px"
          borderRadius="sm"
          _hover={{ backgroundColor: 'purple.600' }}
          color="#fff"
          isLoading={loading}
        >
          REGISTRAR
        </Button>
      </Flex>
    </Grid>
  )
}

export default Register
