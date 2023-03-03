import { scryptSync, randomBytes } from 'node:crypto'

export class Hasher {
  hash (password: string) {
    const salt = randomBytes(16).toString('hex')

    return scryptSync(password, salt, 32).toString('hex')
  }
}
