import { expect, it, describe } from 'vitest'
import { User } from '../entities/user'
import { mapUserToRaw } from '../mapper/user-mapper'
import { type CreateUserParams, type SignupUserUsecase } from '../protocols/signup-user-usecase'
import { SignUpUserController } from './signup-user-controller'

class SignupUserStub implements SignupUserUsecase {
  async execute ({ firstName, lastName, email, password }: CreateUserParams) {
    const domainUser = new User({
      firstName,
      lastName,
      email,
      password
    })

    return mapUserToRaw(domainUser)
  }
}

describe('Sign up user controller', () => {
  it('should return user at success', async () => {
    const signupUserStub = new SignupUserStub()
    const sut = new SignUpUserController(signupUserStub)

    const response = await sut.handle({
      firstName: 'test user',
      email: 'test_user@email.com',
      password: 'password'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).not.toBeNull()
  })
})
