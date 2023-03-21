import { type User } from '../../entities/user'
import { type UserRepository } from '../../repository/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[]

  constructor () {
    this.users = []
  }

  async list () {
    return this.users
  }

  async createUser (user: User): Promise<void> {
    this.users.push(user)
  }
}
