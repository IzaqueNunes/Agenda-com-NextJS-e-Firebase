import { Input } from '@chakra-ui/react'
import React from 'react'

interface InputProps {
  placeholder: string
  type: string
}

const PrimaryInput: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <Input
      height="50px"
      backgroundColor="gray.800"
      focusBorderColor="purple.500"
      border="none"
      color="#fff"
      placeholder={placeholder}
      type={type}
    />
  )
}

export default PrimaryInput
