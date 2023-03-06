import { type Reminder } from '../entities/reminder'

export abstract class ReminderRepository {
  abstract store (reminder: Reminder): Promise<void>
}
