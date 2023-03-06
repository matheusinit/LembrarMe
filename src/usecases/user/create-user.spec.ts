import { describe, expect, it, vitest } from 'vitest'
import { InMemoryUserRepository } from '../../database/in-memory/in-memory-user-repository'
import { type EmailValidator } from '../../protocols/email-validator'
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

const makeEmailValidatorStub = () => {
  class EmailValidatorStub implements EmailValidator {
    check (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = () => {
  const userRepositoryStub = makeUserRepositoryStub()
  const hasherStub = makeHasherStub()
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new CreateUser(userRepositoryStub, hasherStub, emailValidatorStub)

  return {
    userRepositoryStub,
    hasherStub,
    emailValidatorStub,
    sut
  }
}

describe('Create user', () => {
  it('should return with password hashed', async () => {
    const { sut } = makeSut()

    const user = await sut.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.password).not.toBe('senha')
  })

  it('should return correct properties', async () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

    const user = await sut.execute({
      firstName: 'Matheus',
      email: 'matheus@email.com',
      password: 'senha'
    })

    expect(user.lastName).toBeNull()
  })

  it('should throw an error if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'check').mockReturnValueOnce(false)

    const promise = sut.execute({
      firstName: 'Matheus',
      email: 'invalid email',
      password: 'senha'
    })

    void expect(promise).rejects.toThrowError()
  })
})
