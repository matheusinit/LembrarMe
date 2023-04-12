import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { ListUsers } from '../usecases/user/list-users'

export const makeListUser = () => {
  const prismaUserRepository = new UserRepositoryPrisma()

  const listUser = new ListUsers(prismaUserRepository)

  return listUser
}
