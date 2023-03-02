import { type User } from '../entities/user'

export abstract class UserRepository {
  abstract createUser (user: User): Promise<void>
}
