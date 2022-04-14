import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const NewEvent: React.FC = () => {
  return (
    <Flex
      height="100vh"
      backgroundColor="gray.800"
      alignItems="center"
      justifyContent="center"
    >
      <Heading color="#fff">Cadastrar Evento</Heading>
    </Flex>
  )
}

export default NewEvent
