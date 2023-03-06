import { z } from 'zod'
import { type EmailValidator } from '../protocols/email-validator'

export class ZodEmailValidator implements EmailValidator {
  check (email: string): boolean {
    const emailSchema = z.string().email('Invalid email address')

    const result = emailSchema.safeParse(email)

    return result.success
  }
}
