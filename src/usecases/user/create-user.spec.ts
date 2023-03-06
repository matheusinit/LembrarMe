import { describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../database/repository/in-memory/in-memory-user-repository'
import { type HashGenerator } from '../../protocols/hash-generator'
import { CreateUser } from './create-user'

const makeUserRepositoryStub = () => {
  const inMemoryUserRepository = new InMemoryUserRepository()

  return inMemoryUserRepository
}

const makeHasherStub = () => {
  class HasherStub implements HashGenerator {
    hash (password: string): string {
      return 'hashed password'
    }
  }

  return new HasherStub()
}

const makeSut = () => {
  const userRepositoryStub = makeUserRepositoryStub()
  const hasherStub = makeHasherStub()
  return new CreateUser(userRepositoryStub, hasherStub)
}

describe('Create user', () => {
  it('should return with password hashed', async () => {
    const sut = makeSut()

    const user = await sut.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.password).not.toBe('senha')
  })

  it('should return correct properties', async () => {
    const sut = makeSut()

    const user = await sut.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.firstName).toBe('Matheus')
    expect(user.email).toBe('matheus@email.com')
    expect(user.password).toBe('hashed password')
  })

  it('should have last name as null if not setted', async () => {
    const sut = makeSut()

    const user = await sut.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.lastName).toBeNull()
  })
})