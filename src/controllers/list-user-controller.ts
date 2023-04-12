import { z } from 'zod'
import { type ControllerResponse } from '../protocols/controller-response'
import { type ListUsers } from '../usecases/user/list-users'
import { ok } from '../utils/http'

const ListUserSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional()
})

type ControllerRequest = z.infer<typeof ListUserSchema>

interface ResponseSchema {
  message: string
}

export class ListUserController {
  constructor (
    private readonly listUser: ListUsers
  ) {}

  async handle (request: ControllerRequest): Promise<ControllerResponse<ResponseSchema>> {
    const page = Number(request.page ?? 1)
    const limit = Number(request.limit ?? 10)
    const order = request.order ?? 'desc'

    const users = await this.listUser.execute({
      order, limit, page
    })

    return ok(users)
  }
}
