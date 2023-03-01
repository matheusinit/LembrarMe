import {prisma} from '../client'
import {User as UserRaw} from '@prisma/client'

import { User } from "../../entities/user";
import { UserRepository } from "../../repository/user-repository";

export class UserRepositoryPrisma implements UserRepository {
  async createUser(user: User): Promise<void> {
    const userDb: UserRaw = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    }

    await prisma.user.create({
      data: {
        ...userDb
      }
    })
  }
}