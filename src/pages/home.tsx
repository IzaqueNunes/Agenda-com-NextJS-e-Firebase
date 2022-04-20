import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  Grid,
  Heading,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import EventCard from '../components/card/EventCard/EventCard'
import {
  database,
  ref,
  get,
  child,
  remove,
  update,
  refStorage,
  storage,
  uploadBytes,
  getDownloadURL
} from '../services/firebase'

import { TEvent } from '../types/TEvent'
import Header from '../components/ui/header/Header'
import { AuthContext } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

const HomePage = () => {
  const [events, setEvents] = useState<TEvent[]>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [local, setLocal] = useState('')
  const [ticket, setTicket] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()

  const { isSignedIn, isPageLoading, setIsPageLoading } =
    useContext(AuthContext)

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
    setImageUrl(item.imageUrl)
    setId(item.key)
    onOpen()
  }

  // UPDATE DATA
  const handleUpdate = () => {
    if (image) {
      const storageRefPath = refStorage(storage, `/files/${image.name}`)
      uploadBytes(storageRefPath, image).then(snapshot => {
        getDownloadURL(storageRefPath).then(downloadURL => {
          setImageUrl(downloadURL)
          const dados = {
            category: category,
            date: date,
            description: description,
            local: local,
            ticket: ticket,
            title: title,
            imageUrl: downloadURL
          }
          return update(ref(database, 'events/' + id), dados)
            .then(() => {
              setLoading(true)
              toast({
                position: 'top',
                description: 'Evento atualizado com sucesso',
                status: 'success',
                duration: 3000
              })
              setTimeout(() => {
                onClose()
                location.reload()
                setLoading(false)
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
        })
        console.log('Uploaded a blob or file!')
      })
    } else {
      const dados = {
        category: category,
        date: date,
        description: description,
        local: local,
        ticket: ticket,
        title: title
      }
      return update(ref(database, 'events/' + id), dados)
        .then(() => {
          setLoading(true)
          toast({
            position: 'top',
            description: 'Evento atualizado com sucesso',
            status: 'success',
            duration: 3000
          })
          setTimeout(() => {
            onClose()
            location.reload()
            setLoading(false)
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
  }

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
  const readData = () => {
    setIsPageLoading(true)
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
          setIsPageLoading(false)
        } else {
          setIsPageLoading(false)
          console.log('No data available')
        }
      })
      .catch(error => {
        setIsPageLoading(false)

        console.error(error)
      })
  }

  useEffect(() => {
    setIsPageLoading(true)
    if (!isSignedIn) {
      router.push('/')
    }
    setIsPageLoading(false)
    readData()
  }, [])

  return (
    <Flex height="100vh" direction="column">
      {isPageLoading ? (
        <Flex
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xs"
          />
        </Flex>
      ) : (
        <Grid
          as="main"
          height="90vh"
          backgroundColor="#fff"
          templateColumns="1fr"
          templateRows="30px 1fr"
          templateAreas="
          'menu'
          'main'
      "
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Flex gridArea="menu">
            <Header title="Eventos" />
          </Flex>
          {events?.length > 0 ? (
            <Flex
              gridArea="main"
              direction="column"
              marginTop="50px"
              padding="0 20px 20px 20px"
            >
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
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.700">
          <ModalHeader color="gray.100">Editar evento</ModalHeader>
          <ModalCloseButton color="gray.100" />

          <ModalBody display="flex" pb={6} flexDirection="column" gap={5}>
            <Img
              src={imageUrl}
              border="1px"
              borderColor="purple.500"
              borderRadius="8px"
              padding={2}
            />
            <Heading size="sm" color="#fff">
              {' '}
              Escolha uma imagem:{' '}
            </Heading>
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
            <Editable
              defaultValue={title}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
              height="50px"
              display="flex"
              alignItems="center"
            >
              <EditablePreview />
              <EditableInput
                height="50px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setTitle(e.currentTarget.value)}
              />
            </Editable>
            <Editable
              defaultValue={description}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
            >
              <EditablePreview />
              <EditableTextarea
                height="150px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setDescription(e.currentTarget.value)}
              />
            </Editable>
            <Editable
              defaultValue={local}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
              height="50px"
              display="flex"
              alignItems="center"
            >
              <EditablePreview />
              <EditableInput
                height="50px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setLocal(e.currentTarget.value)}
              />
            </Editable>
            <Editable
              defaultValue={ticket}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
              height="50px"
              display="flex"
              alignItems="center"
            >
              <EditablePreview />
              <EditableInput
                height="50px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setTicket(e.currentTarget.value)}
              />
            </Editable>
            <Editable
              defaultValue={date}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
              height="50px"
              display="flex"
              alignItems="center"
            >
              <EditablePreview />
              <EditableInput
                height="50px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setDate(e.currentTarget.value)}
              />
            </Editable>
            <Editable
              defaultValue={category}
              color="#fff"
              backgroundColor="gray.800"
              borderRadius="8px"
              height="50px"
              display="flex"
              alignItems="center"
            >
              <EditablePreview />
              <EditableInput
                height="50px"
                _focus={{ border: '1px', borderColor: 'purple.500' }}
                onChange={e => setCategory(e.currentTarget.value)}
              />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="purple.500"
              _hover={{ backgroundColor: 'purple.600' }}
              color="#fff"
              mr={3}
              onClick={handleUpdate}
              isLoading={loading}
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
