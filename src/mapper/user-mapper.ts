import { type User as DomainUser } from '../entities/user'
import { type User as RawUser } from '@prisma/client'

export const mapUserToRaw = (user: DomainUser): RawUser => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName ?? null,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt ?? null,
    deletedAt: user.deletedAt ?? null
  }
}
