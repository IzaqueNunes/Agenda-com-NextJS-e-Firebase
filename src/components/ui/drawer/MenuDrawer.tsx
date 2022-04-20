import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onOpen}
        color="#fff"
        border="none"
        _hover={{ backgroundColor: 'transparent' }}
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="gray.800" color="#fff">
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap={8} mt={8}>
            <p>
              <Link href="/home">Página inicial</Link>
            </p>
            <p>
              <Link href="newEvent">Cadastrar evento</Link>
            </p>
            <p>
              <Link href="/">Sair</Link>
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Menu>
  )
}

export default MenuDrawer
