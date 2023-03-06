import { type FastifyInstance } from 'fastify'
import { z } from 'zod'

import { UserRepositoryPrisma } from '../database/prisma/user-repository-prisma'
import { CreateUser } from '../usecases/user/create-user'
import { Hasher } from '../utils/hasher'
import { ZodEmailValidator } from '../utils/zod-email-validator'

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/', {}, async (request, reply) => {
    try {
      const createUserSchema = z.object({
        email: z.string(),
        firstName: z.string().min(2),
        lastName: z.string().optional(),
        password: z.string()
      })

      const requestBody = createUserSchema.parse(request.body)

      const { email, firstName, password } = requestBody

      const requiredProperties = ['email', 'firstName', 'password'] as const

      const promises = requiredProperties.map(async param => {
        const paramIsUndefined = requestBody[param] === undefined

        if (paramIsUndefined) {
          return await reply.code(400).send({
            message: `Param '${param}' not specified`
          })
        }
      })

      await Promise.all(promises)

      const userRepository = new UserRepositoryPrisma()
      const hasher = new Hasher()
      const emailValidator = new ZodEmailValidator()
      const createUser = new CreateUser(userRepository, hasher, emailValidator)

      const user = await createUser.execute({
        email,
        firstName,
        password
      })

      return await reply.code(201).send(user)
    } catch (error) {
      return await reply.code(500).send({ statusCode: 500, message: 'An internal error has occured' })
    }
  })
}

export default userRoutes
