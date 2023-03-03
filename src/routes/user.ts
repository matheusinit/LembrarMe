import { type FastifyRequest, type FastifyInstance } from 'fastify'
import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { CreateUser } from '../usecases/user/create-user'
import { Hasher } from '../utils/hasher'

interface CreateUserRequestBody {
  email: string
  firstName: string
  lastName?: string
  password: string
}

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/', {}, async (request: FastifyRequest<{ Body: CreateUserRequestBody }>, reply) => {
    const { email, firstName, password } = request.body

    const requiredProperties = ['email', 'firstName', 'password'] as const

    requiredProperties.map(async param => {
      const paramIsUndefined = request.body[param] === undefined

      if (paramIsUndefined) {
        return await reply.code(400).send({
          message: `Param '${param}' not inserted`
        })
      }
    })

    const userRepository = new UserRepositoryPrisma()
    const hasher = new Hasher()
    const createUser = new CreateUser(userRepository, hasher)

    const user = await createUser.execute({
      email,
      firstName,
      password
    })

    return await reply.code(201).send(user)
  })
}

export default userRoutes
