import { AxiosError } from 'axios'

export const consoleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error(error.response.status)
      console.error(error.response.data)
    }

    console.error(error.config)
    return
  }

  if (error instanceof Error) {
    console.error(error.message)
    return
  }
}
