import { type User } from '@prisma/client'

export interface CreateUserParams {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export abstract class SignupUserUsecase {
  abstract execute (params: CreateUserParams): Promise<User>
}
