import { httpError } from './error'

export const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: httpError('Bad request', message)
  }
}

export const ok = (data: any) => {
  return {
    statusCode: 200,
    body: data
  }
}

export const internalServerError = (message?: string) => {
  return {
    statusCode: 500,
    body: httpError('Internal server error', message ?? 'An internal server error occured')
  }
}
