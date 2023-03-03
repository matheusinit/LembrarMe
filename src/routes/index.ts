import { type FastifyInstance } from 'fastify'
import reminderRoutes from './reminder'
import userRoutes from './user'

async function routes (fastify: FastifyInstance) {
  await fastify.register(reminderRoutes, { prefix: '/reminder' })
  await fastify.register(userRoutes, { prefix: '/user' })
}

export default routes
