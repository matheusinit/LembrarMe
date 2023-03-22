import { type FastifyInstance } from 'fastify'
import { SignUpUserController } from '../controllers/signup-user-controller'
import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { ListUsers } from '../usecases/user/list-users'
import { SignupUser } from '../usecases/user/signup-user'
import { ScryptHasher } from '../utils/scrypt-hasher'
import { ZodEmailValidator } from '../utils/zod-email-validator'

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/', {}, async (request, reply) => {
    const userRepository = new UserRepositoryPrisma()
    const hasher = new ScryptHasher()
    const emailValidator = new ZodEmailValidator()

    const usecase = new SignupUser(userRepository, hasher, emailValidator)

    const controller = new SignUpUserController(usecase)

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
