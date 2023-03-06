import { Reminder } from '../../../entities/reminder'
import { type ReminderRepository } from '../../../repository/reminder-repository'

interface CreateReminderParams {
  name: string
  userId: string
}

export class CreateReminder {
  constructor (private readonly reminderRepository: ReminderRepository) {}

  async execute (params: CreateReminderParams) {
    const { name, userId } = params

    const reminder = new Reminder({
      name, userId
    })

    await this.reminderRepository.store(reminder)

    return reminder
  }
}
