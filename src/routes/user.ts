import { type FastifyInstance } from 'fastify'
import { ListUserController } from '../controllers/list-user-controller'
import { SignUpUserController } from '../controllers/signup-user-controller'
import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { makeSignupUserFactory } from '../factories/sign-up-user-factory'
import { ListUsers } from '../usecases/user/list-users'

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/', {}, async (request, reply) => {
    const usecase = makeSignupUserFactory()

    const controller = new SignUpUserController(usecase)

    const response = await controller.handle(request.body as any)

    return await reply.code(response.statusCode).send(response.body)
  })

  fastify.get('/', {}, async (request, reply) => {
    const prismaUserRepository = new UserRepositoryPrisma()

    const listUsers = new ListUsers(prismaUserRepository)

    const controller = new ListUserController(listUsers)

    const response = await controller.handle(request.query as any)

    return await reply.code(response.statusCode).send(response.body)
  })
}

export default userRoutes
