import { type HttpError } from './http-error'

export interface ControllerResponse<T> {
  statusCode: number
  body: T | HttpError
}
