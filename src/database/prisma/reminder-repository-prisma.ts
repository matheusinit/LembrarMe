import { type Remainder as ReminderRaw } from '@prisma/client'

import { type Reminder } from '../../entities/reminder'
import { type ReminderRepository } from '../../repository/reminder-repository'
import { prisma } from '../client'

export class ReminderRepositoryPrisma implements ReminderRepository {
  async store (reminder: Reminder): Promise<void> {
    const reminderDb: ReminderRaw = {
      id: reminder.id,
      name: reminder.name,
      userId: reminder.userId,
      createdAt: reminder.createdAt,
      updatedAt: reminder.updatedAt ?? null,
      deletedAt: reminder.deletedAt ?? null
    }

    await prisma.remainder.create({
      data: {
        ...reminderDb
      }
    })
  }
}
