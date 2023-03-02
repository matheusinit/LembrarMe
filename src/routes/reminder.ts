import { type FastifyInstance, type RouteShorthandOptions } from 'fastify'
import { listReminders } from '../usecases/reminders/list-reminders'

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        properties: {
          id: {
            type: 'number'
          },
          content: {
            type: 'string'
          },
          createdAt: {
            type: 'string'
          }
        }
      }
    }
  }
}

async function reminderRoutes (fastify: FastifyInstance, options) {
  fastify.get('/', opts, async (request, reply) => {
    const reminders = listReminders()

    return reminders
  })
}

export default reminderRoutes
