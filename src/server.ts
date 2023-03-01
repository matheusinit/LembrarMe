import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

import reminderRoutes from './routes/reminder'
import envVars from './config/environment-variables'

const server: FastifyInstance = Fastify({})

server.register(reminderRoutes)

const start = async () => {
  try {
    await server.listen({ port: envVars.PORT ?? 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log(`Running on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()