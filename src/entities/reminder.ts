import { type Replace } from '../types/replace'
import { BaseEntity } from './base-entity'

interface ReminderProps {
  name: string
  userId: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class Reminder extends BaseEntity {
  private readonly props: ReminderProps

  constructor (props: Replace<ReminderProps, { createdAt?: Date }>, id?: string) {
    super(id)

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get name () {
    return this.props.name
  }

  public set name (value: string) {
    this.props.name = value
  }

  public get userId () {
    return this.props.userId
  }

  public set userId (value: string) {
    this.props.userId = value
  }

  public get createdAt () {
    return this.props.createdAt
  }

  public set createdAt (value: Date) {
    this.props.createdAt = value
  }

  public get updatedAt () {
    return this.props.updatedAt ?? undefined
  }

  public set updatedAt (value: Date | undefined) {
    this.props.updatedAt = value
  }

  public get deletedAt () {
    return this.props.deletedAt ?? undefined
  }

  public set deletedAt (value: Date | undefined) {
    this.props.deletedAt = value
  }
}
