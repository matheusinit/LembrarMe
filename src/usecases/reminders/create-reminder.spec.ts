import { describe, expect, it, vitest } from 'vitest'
import { InMemoryReminderRepository } from '../../database/in-memory/in-memory-reminder-repository'
import { CreateReminder } from './create-reminder'

const makeInMemoryReminderRepository = () => {
  return new InMemoryReminderRepository()
}

const makeSut = () => {
  const inMemoryReminderRepository = makeInMemoryReminderRepository()
  const sut = new CreateReminder(inMemoryReminderRepository)

  return {
    inMemoryReminderRepository,
    sut
  }
}

describe('Create reminder', () => {
  it('should return data about at success', async () => {
    const { sut } = makeSut()

    const reminder = await sut.execute({
      name: 'Read compiler\'s book',
      userId: 'some-random-id'
    })

    expect(reminder).toHaveProperty('id')
    expect(reminder).toHaveProperty('name')
    expect(reminder).toHaveProperty('userId')
  })

  it('should call a repository to store reminder', async () => {
    const { sut, inMemoryReminderRepository } = makeSut()
    const storeReminderSpy = vitest.spyOn(inMemoryReminderRepository, 'store')

    await sut.execute({
      name: 'Read compiler\'s book',
      userId: 'some-random-id'
    })

    expect(storeReminderSpy).toHaveBeenCalledOnce()
  })

  it('should return correct values', async () => {
    const { sut } = makeSut()

    const reminder = await sut.execute({
      name: 'Read compiler\'s book',
      userId: 'some-random-id'
    })

    expect(reminder.id).toBeTypeOf('string')
    expect(reminder.name).toBe('Read compiler\'s book')
    expect(reminder.userId).toBe('some-random-id')
  })

  it('should not return the same id', async () => {
    const { sut } = makeSut()

    const reminder = await sut.execute({
      name: 'Read compiler\'s book',
      userId: 'some-random-id'
    })

    const reminder2 = await sut.execute({
      name: 'Watch some Akita\'s video',
      userId: 'some-random-id'
    })

    expect(reminder.id).not.toEqual(reminder2.id)
  })
})
