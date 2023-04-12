import { type User } from '@prisma/client'
import { z } from 'zod'
import { type ControllerResponse } from '../protocols/controller-response'
import { type HttpError } from '../protocols/http-error'
import { type SignupUserUsecase } from '../protocols/signup-user-usecase'
import { badRequest, internalServerError, ok } from '../utils/http'

const CreateUserSchema = z.object({
  email: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  password: z.string()
})

type ControllerRequest = z.infer<typeof CreateUserSchema>

export class SignUpUserController {
  constructor (
    private readonly signupUser: SignupUserUsecase
  ) {}

  async handle (request: ControllerRequest): Promise<ControllerResponse<User>> {
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

      const user = await this.signupUser.execute({
        email,
        firstName,
        lastName,
        password
      })

      return ok(user)
    } catch (err) {
      const error = err as Error

      if (error.message === 'Invalid email address') {
        return badRequest(error.message)
      }

      return internalServerError(error.message)
    }
  }
}
