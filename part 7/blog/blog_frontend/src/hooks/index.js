import { useState } from 'react'

export const useField = (type) => {
  const [ value, setValue ] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const setEmpty = () => {
    setValue('')
  }

  return {
    field: {
      type,
      value,
      onChange
    },
    setEmpty: setEmpty
  }
}