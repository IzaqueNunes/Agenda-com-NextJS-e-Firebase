import React, { useState } from 'react'

import {
  database,
  ref,
  set,
  storage,
  refStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable
} from '../services/firebase'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react'
import Link from 'next/link'
import MenuDrawer from '../components/ui/drawer/MenuDrawer'

const NewEvent: React.FC = () => {
  const toast = useToast()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [local, setLocal] = useState('')
  const [ticket, setTicket] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(false)

  const writeUserData = () => {
    let eventId = uuidv4()
    setLoading(true)

    const storageRefPath = refStorage(storage, `/files/${image.name}`)

    uploadBytes(storageRefPath, image).then(snapshot => {
      getDownloadURL(storageRefPath).then(downloadURL => {
        set(ref(database, 'events/' + eventId), {
          title: title,
          date: new Date(date).toLocaleDateString(),
          category: category,
          local: local,
          ticket: ticket,
          description: description,
          imageUrl: downloadURL
        })
        console.log('URL: ', downloadURL)
      })
      console.log('Uploaded a blob or file!')
    })
    toast({
      position: 'top',
      description: 'Evento cadastrado com sucesso',
      status: 'success',
      duration: 3000
    })
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

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
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="date"
            placeholder="Data"
            onChange={e => setDate(e.currentTarget.value)}
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Categoria"
            onChange={e => setCategory(e.currentTarget.value)}
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Modalidade/Local"
            onChange={e => setLocal(e.currentTarget.value)}
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            type="text"
            placeholder="Ingresso"
            onChange={e => setTicket(e.currentTarget.value)}
          />
          <Input
            height="50px"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            placeholder="Imagem"
            type="file"
            onChange={e => setImage(e.currentTarget.files[0])}
          />
          <Textarea
            placeholder="Descrição"
            size="sm"
            backgroundColor="gray.800"
            focusBorderColor="purple.500"
            border="none"
            color="#fff"
            onChange={e => setDescription(e.currentTarget.value)}
          />
          <Button
            marginTop={6}
            backgroundColor="purple.500"
            _hover={{ backgroundColor: 'purple.600' }}
            height="50px"
            borderRadius="sm"
            color="#fff"
            isLoading={loading}
            onClick={writeUserData}
          >
            Enviar
          </Button>
        </Flex>
      </Grid>
    </Flex>
  )
}

export default NewEvent
