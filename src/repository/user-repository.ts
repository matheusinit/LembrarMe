import { type User } from '../entities/user'

export interface ListParams {
  order: 'asc' | 'desc'
  take: number
  skip: number
}

export abstract class UserRepository {
  abstract createUser (user: User): Promise<void>
  abstract list (params: ListParams): Promise<User[]>
}
