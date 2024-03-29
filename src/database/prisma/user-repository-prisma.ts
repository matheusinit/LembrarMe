import { type User as UserRaw } from '@prisma/client'
import { prisma } from '../client'

import { User } from '../../entities/user'
import { type ListParams, type UserRepository } from '../../repository/user-repository'

export class UserRepositoryPrisma implements UserRepository {
  async list (params: ListParams): Promise<User[]> {
    const { order, skip, take } = params

    const users = await prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: order
      }
    })

    const usersDomain: User[] = users.map(user => (new User({
      firstName: user.firstName,
      lastName: user.lastName ?? undefined,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
      deletedAt: user.deletedAt ?? undefined
    }, user.id)))

    return usersDomain
  }

  async createUser (user: User): Promise<void> {
    const userDb: UserRaw = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName ?? null,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null,
      deletedAt: user.deletedAt ?? null
    }

    await prisma.user.create({
      data: {
        ...userDb
      }
    })
  }
}
