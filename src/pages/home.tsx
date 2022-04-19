import React, { useEffect, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, Heading, useToast } from '@chakra-ui/react'
import EventCard from '../components/card/EventCard/EventCard'
import MenuDrawer from '../components/ui/drawer/MenuDrawer'
import { database, ref, get, child, remove } from '../services/firebase'
import Link from 'next/link'

interface Event {
  key: string
  title: string
  category: string
  date: string
  description: string
  local: string
  ticket: string
  imageUrl: string
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>()

  const toast = useToast()

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
          const resultEvents = Object.entries<Event>(snapshot.val()).map(
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
            {events?.map(event => (
              <EventCard
                key={event.key}
                title={event.title}
                imageUrl={event.imageUrl}
                imageAlt={event.title}
                description={event.description}
                reviewCount={34}
                rating={4}
                info1={event.date}
                info2={event.local}
                onClickDelete={() => handleDelete(event.key)}
              />
            ))}
          </Flex>
        ) : (
          <Heading alignSelf="center" justifySelf="center">
            Sem eventos cadastrados
          </Heading>
        )}
      </Grid>
    </Flex>
  )
}

export default HomePage
