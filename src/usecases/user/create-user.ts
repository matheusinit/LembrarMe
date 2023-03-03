import { User } from '../../entities/user'
import { mapUserToRaw } from '../../mapper/user-mapper'
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

  constructor (userRepository: UserRepository, hasher: Hasher) {
    this.userRepository = userRepository
    this.hasher = hasher
  }

  async execute (params: CreateUserParams) {
    const { firstName, lastName, email, password } = params

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
