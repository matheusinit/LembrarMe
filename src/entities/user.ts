import { BaseEntity } from './base-entity'
import { type Replace } from '../types/replace'

interface UserProps {
  firstName: string
  lastName?: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export class User extends BaseEntity {
  private readonly props: UserProps

  constructor (props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    super(id)

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public get firstName () {
    return this.props.firstName
  }

  public set firstName (value: string) {
    this.props.firstName = value
  }

  public get lastName () {
    return this.props.lastName ?? undefined
  }

  public set lastName (value: string | undefined) {
    this.props.lastName = value
  }

  public get email () {
    return this.props.email
  }

  public set email (value: string) {
    this.props.email = value
  }

  public get password () {
    return this.props.password
  }

  public set password (value: string) {
    this.props.password = value
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
