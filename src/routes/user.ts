import { type FastifyInstance } from 'fastify'
import { CreateUserController } from '../controllers/create-user-controller'
import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { ListUsers } from '../usecases/user/list-users'

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/', {}, async (request, reply) => {
    const controller = new CreateUserController()

    const response = await controller.handle(request.body as any)

    return await reply.code(response.statusCode).send(response.body)
  })

  fastify.get('/', {}, async (request, reply) => {
    const prismaUserRepository = new UserRepositoryPrisma()
    const listUsers = new ListUsers(prismaUserRepository)

    const users = await listUsers.execute()

    return await reply.code(200).send(users)
  })
}

export default userRoutes
