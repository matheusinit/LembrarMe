import { prisma } from '../client'
import { type User as UserRaw } from '@prisma/client'

import { type User } from '../../entities/user'
import { type UserRepository } from '../../repository/user-repository'

export class UserRepositoryPrisma implements UserRepository {
  async createUser (user: User): Promise<void> {
    const userDb: UserRaw = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName ?? null,
      email: user.email,
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
