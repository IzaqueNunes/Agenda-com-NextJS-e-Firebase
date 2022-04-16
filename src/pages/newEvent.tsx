import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, Heading, Input, Textarea } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import MenuDrawer from '../components/ui/drawer/MenuDrawer'

const NewEvent: React.FC = () => {
  return (
    <Flex height="100vh" direction="column">
      <Grid
        as="head"
        height="10vh"
        backgroundColor="gray.800"
        templateColumns="500px 70px"
        templateRows="50px"
        templateAreas="
          'header out'
      "
        justifyContent="space-between"
      >
        <Flex marginLeft={3} gridArea="header" mt={6}>
          <MenuDrawer />
          <Heading color="#fff" ml={2}>
            Cadastrar evento
          </Heading>
        </Flex>

        <Flex gridArea="out" mt={6} marginRight={20}>
          <Link href="/">
            <Button
              leftIcon={<ArrowBackIcon />}
              backgroundColor="transparent"
              color="#fff"
              _hover={{ backgroundColor: 'transparent' }}
            >
              Sair
            </Button>
          </Link>
        </Flex>
      </Grid>

      <Grid
        as="main"
        height="100vh"
        templateColumns="1fr 700px 1fr"
        templateRows="1fr 700px 1fr"
        templateAreas="
          '. . . '
          '. form .'
          '. . .'
      "
        alignItems="center"
        justifyContent="center"
        padding="0 20px"
      >
        <Flex
          gridArea="form"
          height="100%"
          backgroundColor="gray.700"
          borderColor="gray.800"
          borderRadius="md"
          padding={16}
          flexDir="column"
          alignItems="stretch"
          gap={6}
        >
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Título"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="date"
            placeholder="Data"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Categoria"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Modalidade/Local"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Ingresso"
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="file"
            placeholder="Imagem"
          />
          <Textarea
            placeholder="Descrição"
            size="sm"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
          />
          <Link href="/home">
            <Button
              marginTop={6}
              backgroundColor="purple.500"
              height="50px"
              borderRadius="sm"
              _hover={{ backgroundColor: 'purple.600' }}
              color="#fff"
            >
              Enviar
            </Button>
          </Link>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default NewEvent
