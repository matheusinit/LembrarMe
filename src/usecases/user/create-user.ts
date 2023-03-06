import { User } from '../../entities/user'
import { mapUserToRaw } from '../../mapper/user-mapper'
import { type EmailValidator } from '../../protocols/email-validator'
import { type UserRepository } from '../../repository/user-repository'
import { type Hasher } from '../../utils/hasher'

interface CreateUserParams {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export class CreateUser {
  private readonly userRepository: UserRepository
  private readonly hasher: Hasher
  private readonly emailValidator: EmailValidator

  constructor (userRepository: UserRepository, hasher: Hasher, emailValidator: EmailValidator) {
    this.userRepository = userRepository
    this.hasher = hasher
    this.emailValidator = emailValidator
  }

  async execute (params: CreateUserParams) {
    const { firstName, lastName, email, password } = params

    const isEmailValid = this.emailValidator.check(email)

    if (!isEmailValid) {
      /**
       * Create a new error in this structure
       *
       * return {
           statusCode: 400,
           error: 'Invalid email address'
         }
       *
       *
       */

      throw new Error('Invalid email address')
    }

    const encryptedPassword = this.hasher.hash(password)

    const domainUser = new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword
    })

    await this.userRepository.createUser(domainUser)

    const user = mapUserToRaw(domainUser)

    return user
  }
}
