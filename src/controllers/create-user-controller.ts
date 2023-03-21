import { z } from 'zod'
import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { type User } from '../entities/user'
import { CreateUser } from '../usecases/user/create-user'
import { ScryptHasher } from '../utils/scrypt-hasher'
import { ZodEmailValidator } from '../utils/zod-email-validator'

const CreateUserSchema = z.object({
  email: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  password: z.string()
})

type ControllerRequest = z.infer<typeof CreateUserSchema>

interface ControllerResponse<T> {
  statusCode: number
  body: T
}

interface HttpError extends Error {
  message: string
}

const httpError = (name: string, message: string) => ({
  name,
  message
})

const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: httpError('Bad request', message)
  }
}

const ok = (data: any) => {
  return {
    statusCode: 200,
    body: data
  }
}

const internalServerError = (message?: string) => {
  return {
    statusCode: 500,
    body: httpError('Internal server error', message ?? 'An internal server error occured')
  }
}

export class CreateUserController {
  async handle (request: ControllerRequest): Promise<ControllerResponse<User | HttpError>> {
    try {
      const { firstName, lastName, email, password } = request

      const requiredProperties = ['email', 'firstName', 'password'] as const

      const promises = requiredProperties.map(async param => {
        const paramIsUndefined = request[param] === undefined

        if (paramIsUndefined) {
          return badRequest(`Param ${param} not specified`)
        }
      })

      await Promise.all(promises)

      const userRepository = new UserRepositoryPrisma()
      const hasher = new ScryptHasher()
      const emailValidator = new ZodEmailValidator()
      const createUser = new CreateUser(userRepository, hasher, emailValidator)

      const user = await createUser.execute({
        email,
        firstName,
        lastName,
        password
      })

      return ok(user)
    } catch (error) {
      return internalServerError('Something happened at creation of user')
    }
  }
}
