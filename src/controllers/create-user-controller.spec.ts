import { expect, it, describe } from 'vitest'
import { CreateUserController } from './create-user-controller'

describe('Create user controller', () => {
  it('should return user at success', async () => {
    const sut = new CreateUserController()

    const response = await sut.handle({
      firstName: 'test user',
      email: 'test_user@email.com',
      password: 'password'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).not.toBeNull()
  })
})
