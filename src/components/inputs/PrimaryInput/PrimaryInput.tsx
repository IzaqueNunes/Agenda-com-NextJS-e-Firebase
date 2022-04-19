import React, { useEffect, useRef } from 'react'
import { Input } from '@chakra-ui/react'
import { useField } from '@unform/core'

interface InputProps {
  placeholder?: string
  type?: string
  name: string
  value?: string
}

const PrimaryInput: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])
  return (
    <Input
      placeholder={placeholder}
      ref={inputRef}
      height="50px"
      backgroundColor="gray.800"
      focusBorderColor="purple.500"
      color="#fff"
      type={type}
      value={value}
      {...rest}
    />
  )
}

export default PrimaryInput
