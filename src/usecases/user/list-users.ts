import { type UserRepository } from '../../repository/user-repository'

interface ListUsersParams {
  order?: string
  page?: number
  limit?: number
}

type Order = 'asc' | 'desc'

export class ListUsers {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async execute (params: ListUsersParams = {}) {
    const { page = 1, limit = 5 } = params
    const { order: orderString = 'desc' } = params

    const take = limit
    const skip = (page - 1) * limit
    const order = orderString as Order

    const users = await this.userRepository.list({
      take,
      skip,
      order
    })

    return users
  }
}
