import { type Reminder } from '../../entities/reminder'
import { type ReminderRepository } from '../../repository/reminder-repository'

export class InMemoryReminderRepository implements ReminderRepository {
  private readonly reminders: Reminder[]

  constructor () {
    this.reminders = []
  }

  get list () {
    return this.reminders
  }

  async store (reminder: Reminder): Promise<void> {
    this.reminders.push(reminder)
  }
}
