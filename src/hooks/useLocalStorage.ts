import { useState, useEffect } from 'react'

const KEY_PREFIX = 'online-chat-app-'

const useLocalStorage = (key: string, initialValue?: any) => {
  const STORAGE_KEY = KEY_PREFIX + key

  const [value, setValue] = useState(() => {
    const jsonResponse = sessionStorage.getItem(STORAGE_KEY)
    if (jsonResponse !== null && jsonResponse !== 'undefined') {
      const parsedValue = JSON.parse(jsonResponse)
      if (parsedValue === 'function') {
        return parsedValue()
      }
      return parsedValue
    } else {
      if (initialValue) {
        return initialValue
      }
    }
  })

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, [STORAGE_KEY, value])

  return [value, setValue]
}

export default useLocalStorage
