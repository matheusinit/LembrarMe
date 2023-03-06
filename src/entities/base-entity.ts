import { CuidGenerator } from '../utils/cuid-generator'

export class BaseEntity {
  private readonly _id: string

  constructor (id?: string) {
    const cuidGenerator = new CuidGenerator()

    this._id = id ?? cuidGenerator.generate()
  }

  public get id () {
    return this._id
  }
}
