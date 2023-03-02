export class BaseEntity {
  private readonly _id: string

  constructor (id?: string) {
    this._id = id ?? '1'
  }

  public get id () {
    return this._id
  }
}
