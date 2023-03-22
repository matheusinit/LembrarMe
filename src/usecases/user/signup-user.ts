import { User } from '../../entities/user'
import { mapUserToRaw } from '../../mapper/user-mapper'
import { type EmailValidator } from '../../protocols/email-validator'
import { type HashGenerator } from '../../protocols/hash-generator'
import { type CreateUserParams, type SignupUserUsecase } from '../../protocols/signup-user-usecase'
import { type UserRepository } from '../../repository/user-repository'

export class SignupUser implements SignupUserUsecase {
  private readonly userRepository: UserRepository
  private readonly hasher: HashGenerator
  private readonly emailValidator: EmailValidator

  constructor (userRepository: UserRepository, hasher: HashGenerator, emailValidator: EmailValidator) {
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
