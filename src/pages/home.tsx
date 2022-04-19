import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FormHandles } from '@unform/core'

import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import EventCard from '../components/card/EventCard/EventCard'
import MenuDrawer from '../components/ui/drawer/MenuDrawer'
import { database, ref, get, child, remove, update } from '../services/firebase'
import Link from 'next/link'

import { TEvent } from '../types/TEvent'

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<TEvent[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [local, setLocal] = useState('')
  const [ticket, setTicket] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const updateRef = useRef<FormHandles>(null)

  const [id, setId] = useState('')

  const toast = useToast()

  // FINDING DATA TO UPDATE
  const updateFill = (item: TEvent) => {
    setTitle(item.title)
    setDescription(item.description)
    setLocal(item.local)
    setTicket(item.ticket)
    setCategory(item.category)
    setDate(item.date)
    setId(item.key)
    onOpen()
  }

  // UPDATE DATA

  // DELETE DATA
  const handleDelete = (refToDelete: string) => {
    remove(ref(database, `events/${refToDelete}`))
      .then(() => {
        location.reload()
        toast({
          position: 'top',
          description: 'Evento deletado com sucesso',
          status: 'success',
          duration: 3000
        })
      })
      .catch(() => {
        toast({
          position: 'top',
          description: 'Houve um erro ao deletar o evento',
          status: 'error',
          duration: 3000
        })
      })
  }

  // READ DATA
  useEffect(() => {
    const dbRef = ref(database)
    get(child(dbRef, `events`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const resultEvents = Object.entries<TEvent>(snapshot.val()).map(
            ([key, value]) => {
              return {
                key: key,
                title: value.title,
                category: value.category,
                date: value.date,
                description: value.description,
                local: value.local,
                ticket: value.ticket,
                imageUrl: value.imageUrl
              }
            }
          )
          setEvents(resultEvents)
        } else {
          console.log('No data available')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <Flex height="100vh" direction="column">
      <Grid
        as="head"
        height="10vh"
        backgroundColor="gray.800"
        templateColumns="200px 70px"
        templateRows="50px"
        templateAreas="
          'header out'
      "
        justifyContent="space-between"
      >
        <Flex marginLeft={3} gridArea="header" mt={6}>
          <MenuDrawer />
          <Heading color="#fff" ml={2}>
            Eventos
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
        height="90vh"
        backgroundColor="#fff"
        templateColumns="1fr"
        templateRows="1fr"
        templateAreas="
          'main'
      "
        justifyContent="flex-start"
        alignItems="flex-start"
        padding="0 20px"
      >
        {events?.length > 0 ? (
          <Flex gridArea="main" direction="column" paddingBottom="20px">
            {events?.map((item, index) => (
              <EventCard
                key={index}
                title={item.title}
                imageUrl={item.imageUrl}
                imageAlt={item.title}
                description={item.description}
                reviewCount={34}
                rating={4}
                info1={item.date}
                info2={item.local}
                onClickDelete={() => handleDelete(item.key)}
                onClickUpdate={() => updateFill(item)}
              />
            ))}
          </Flex>
        ) : (
          <Heading alignSelf="center" justifySelf="center">
            Sem eventos cadastrados
          </Heading>
        )}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.800">
          <ModalHeader color="gray.100">Editar evento</ModalHeader>
          <ModalCloseButton color="gray.100" />

          <ModalBody display="flex" pb={6} flexDirection="column" gap={5}>
            <Editable defaultValue={title} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
            <Editable defaultValue={description} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
            <Editable defaultValue={local} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
            <Editable defaultValue={ticket} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
            <Editable defaultValue={date} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
            <Editable defaultValue={category} color="#fff">
              <EditablePreview />
              <EditableInput height="50px" />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="purple.500"
              _hover={{ backgroundColor: 'purple.600' }}
              color="#fff"
              mr={3}
              type="submit"
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default HomePage
