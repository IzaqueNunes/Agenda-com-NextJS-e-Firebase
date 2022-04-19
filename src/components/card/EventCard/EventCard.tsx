import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Grid, Image } from '@chakra-ui/react'
import React from 'react'

interface EventCardProps {
  imageUrl: string
  imageAlt: string
  info1: string
  info2: string
  title: string
  description: string
  reviewCount: number
  rating: number
}

const EventCard: React.FC<EventCardProps> = props => {
  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection="row"
      marginTop={6}
    >
      <Grid
        as="main"
        templateColumns="300px 1fr"
        templateRows="200px"
        templateAreas="
          'image description'
      "
        justifyContent="center"
        alignItems="center"
      >
        <Box gridArea="image">
          <Image src={props.imageUrl} alt={props.imageAlt} />
        </Box>

        <Box
          gridArea="description"
          height="100%"
          p={6}
          backgroundColor="gray.200"
        >
          <Box display="flex" alignItems="center">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              Recente
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {props.info1} &bull; {props.info2}
            </Box>
            <Box
              display="flex"
              color="gray.500"
              gap={6}
              position="absolute"
              right={8}
            >
              <EditIcon cursor="pointer" />
              <DeleteIcon cursor="pointer" />
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {props.title}
          </Box>

          <Box>{props.description}</Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < props.rating ? 'teal.500' : 'gray.400'}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {props.reviewCount} Avalicações
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default EventCard
