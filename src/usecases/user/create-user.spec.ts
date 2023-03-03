import { describe, expect, it } from 'vitest'
import { type User } from '../../entities/user'
import { type HashGenerator } from '../../protocols/hash-generator'
import { type UserRepository } from '../../repository/user-repository'
import { CreateUser } from './create-user'

class UserRepositoryStub implements UserRepository {
  async createUser (user: User): Promise<void> {
    await new Promise((resolve) => { resolve(null) })
  }
}

class HasherStub implements HashGenerator {
  hash (password: string): string {
    return 'hashed password'
  }
}

describe('Create user', () => {
  it('should return with password hashed', async () => {
    const userRepositoryStub = new UserRepositoryStub()
    const hasherStub = new HasherStub()

    const createUser = new CreateUser(userRepositoryStub, hasherStub)

    const user = await createUser.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.password).not.toBe('senha')
  })

  it('should return correct properties', async () => {
    const userRepositoryStub = new UserRepositoryStub()
    const hasherStub = new HasherStub()

    const createUser = new CreateUser(userRepositoryStub, hasherStub)

    const user = await createUser.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.firstName).toBe('Matheus')
    expect(user.email).toBe('matheus@email.com')
    expect(user.password).toBe('hashed password')
  })
})
