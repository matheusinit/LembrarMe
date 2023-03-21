import { scryptSync, randomBytes } from 'node:crypto'
import { type HashGenerator } from '../protocols/hash-generator'

export class ScryptHasher implements HashGenerator {
  hash (password: string) {
    const salt = randomBytes(16).toString('hex')

    return scryptSync(password, salt, 32).toString('hex')
  }
}
