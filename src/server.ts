import Fastify, { type FastifyInstance } from 'fastify'

import fastifyEnv from '@fastify/env'
import routes from './routes'

const server: FastifyInstance = Fastify()

declare module 'fastify' {
  interface FastifyInstance {
    config: { // this should be same as the confKey in options
      PORT?: number
      HOST?: string
    }
  }
}

const schema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'number',
      default: undefined
    },
    HOST: {
      type: 'string',
      default: undefined
    }
  }
}

const start = async () => {
  try {
    await server.register(fastifyEnv, {
      data: process.env,
      confKey: 'config',
      dotenv: true,
      schema
    })

    await server.after()

    await server.register(routes)

    await server.ready()
    await server.listen({ port: server.config.PORT ?? 3000, host: server.config.HOST ?? '0.0.0.0' })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : String(address?.port)

    console.log(`Running on port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

void start()
