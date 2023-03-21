import { describe, it, expect, vitest } from 'vitest'
import { InMemoryUserRepository } from '../../database/in-memory/in-memory-user-repository'
import { User } from '../../entities/user'
import { ListUsers } from './list-users'

describe('List users', () => {
  it('should return a list of expected users', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const sut = new ListUsers(inMemoryUserRepository)

    const testUser = new User({
      firstName: 'test user',
      email: 'test_user@email.com',
      password: 'password'
    })

    vitest.spyOn(inMemoryUserRepository, 'list').mockReturnValueOnce(new Promise((resolve, reject) => {
      resolve([testUser])
    }))

    const users = await sut.execute()

    expect(users).toBeInstanceOf(Array)
    expect(users.length).toBe(1)
    expect(users.length).not.toBe(0)
  })
})
