import axios from 'axios'
import { useState, useEffect } from 'react'

/**
 * took me a bit of time to write this hook,
 * but I'm pretty happy with the result :)
 * typing it was the hardest part
 */

type ReturnType<T> = {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  data: T | undefined
}

export const useFetch = <T>(
  url: string,
  enabled = true,
  deps = [] as any[]
): ReturnType<T> => {
  const [data, setData] = useState<T | undefined>()
  const [status, setStatus] = useState<Omit<ReturnType<T>, 'data'>>({
    isError: false,
    isLoading: false,
    isSuccess: false,
  })

  useEffect(() => {
    if (enabled) setStatus(prev => ({ ...prev, isLoading: true }))

    // artificial delay to simulate loading behavior
    const timeout = setTimeout(() => {
      // fire request only if we are allowed to do so
      if (enabled) {
        axios
          .get(url)
          .then(({ data }) => {
            setStatus(prev => ({ ...prev, isSuccess: true }))
            setData(data)
          })
          .catch(() => setStatus(prev => ({ ...prev, isError: true })))
          .finally(() => setStatus(prev => ({ ...prev, isLoading: false })))
      }

      return () => {
        clearTimeout(timeout)
      }
    }, 1000)

    // eslint-disable-next-line
  }, deps)

  return {
    ...status,
    data,
  }
}
