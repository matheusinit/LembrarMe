import { z } from 'zod'
import { type ControllerResponse } from '../protocols/controller-response'
import { ok } from '../utils/http'

const ListUserSchema = z.object({
  page: z.number(),
  limit: z.number(),
  order: z.enum(['asc', 'desc'])
})

type ControllerRequest = z.infer<typeof ListUserSchema>

interface ResponseSchema {
  message: string
}

export class ListUserController {
  async handle (request: ControllerRequest): Promise<ControllerResponse<ResponseSchema>> {
    return ok({
      message: 'Hello World'
    })
  }
}
