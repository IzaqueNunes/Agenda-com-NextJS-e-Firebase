import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, Heading } from '@chakra-ui/react'
import React from 'react'
import EventCard from '../components/card/EventCard/EventCard'
import MenuDrawer from '../components/ui/drawer/MenuDrawer'
import Link from 'next/link'

const HomePage: React.FC = () => {
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
        <Flex gridArea="main" direction="column" paddingBottom="20px">
          <EventCard
            title="Latinowere"
            imageUrl="https://latinoware.org/wp-content/uploads/2021/09/Modelo_Wallpapper2021_1024x768-A.png"
            imageAlt="Latinowere"
            description="Congresso Latino-Americano de Software Livre e Tecnologias Abertas, também conhecido como Latinoware, é um dos maiores eventos anuais de software livre e tecnologia aberta do mundo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
          <EventCard
            title="Latinowere"
            imageUrl="https://latinoware.org/wp-content/uploads/2021/09/Modelo_Wallpapper2021_1024x768-A.png"
            imageAlt="Latinowere"
            description="Congresso Latino-Americano de Software Livre e Tecnologias Abertas, também conhecido como Latinoware, é um dos maiores eventos anuais de software livre e tecnologia aberta do mundo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
          <EventCard
            title="Latinowere"
            imageUrl="https://latinoware.org/wp-content/uploads/2021/09/Modelo_Wallpapper2021_1024x768-A.png"
            imageAlt="Latinowere"
            description="Congresso Latino-Americano de Software Livre e Tecnologias Abertas, também conhecido como Latinoware, é um dos maiores eventos anuais de software livre e tecnologia aberta do mundo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
          <EventCard
            title="Campus Party"
            imageUrl="https://appbrasil.org.br/wp-content/uploads/2018/01/24796593_10155729131442349_933692105969144836_n.jpg"
            imageAlt="Latinowere"
            description="A Campus Party Brasil é a versão brasileira da Campus Party, a maior experiência tecnológica do mundo que acontece em torno de um festival de inovação, criatividade, ciências e empreendedorismo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
          <EventCard
            title="Campus Party"
            imageUrl="https://appbrasil.org.br/wp-content/uploads/2018/01/24796593_10155729131442349_933692105969144836_n.jpg"
            imageAlt="Latinowere"
            description="A Campus Party Brasil é a versão brasileira da Campus Party, a maior experiência tecnológica do mundo que acontece em torno de um festival de inovação, criatividade, ciências e empreendedorismo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
          <EventCard
            title="Campus Party"
            imageUrl="https://appbrasil.org.br/wp-content/uploads/2018/01/24796593_10155729131442349_933692105969144836_n.jpg"
            imageAlt="Latinowere"
            description="A Campus Party Brasil é a versão brasileira da Campus Party, a maior experiência tecnológica do mundo que acontece em torno de um festival de inovação, criatividade, ciências e empreendedorismo."
            reviewCount={34}
            rating={4}
            info1="Online"
            info2="Gratuito"
          />
        </Flex>
      </Grid>
    </Flex>
  )
}

export default HomePage
