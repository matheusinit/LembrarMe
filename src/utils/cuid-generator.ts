import { type IdentifierGenerator } from '../protocols/identifier-generator'

import { createId } from '@paralleldrive/cuid2'

export class CuidGenerator implements IdentifierGenerator {
  generate (): string {
    return createId()
  }
}
