import { type HttpError } from '../../protocols/http-error'

export const httpError = (name: string, message: string): HttpError => ({
  name,
  message
})
