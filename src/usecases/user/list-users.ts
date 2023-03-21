import { type UserRepository } from '../../repository/user-repository'

export class ListUsers {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async execute () {
    const users = this.userRepository.list()

    return await users
  }
}
