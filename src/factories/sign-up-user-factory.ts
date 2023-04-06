import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { SignupUser } from '../usecases/user/signup-user'
import { ScryptHasher } from '../utils/scrypt-hasher'
import { ZodEmailValidator } from '../utils/zod-email-validator'

export const makeSignupUserFactory = () => {
  const userRepository = new UserRepositoryPrisma()
  const hasher = new ScryptHasher()
  const emailValidator = new ZodEmailValidator()

  const signupUser = new SignupUser(userRepository, hasher, emailValidator)

  return signupUser
}
