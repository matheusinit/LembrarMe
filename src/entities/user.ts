import { BaseEntity } from "./base-entity"

type UserProps = {
  firstName: string
  lastName?: string
  email: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

type Replace<T, R> = Omit<T, keyof R> & R

export class User extends BaseEntity {
  private readonly props: UserProps

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
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
    return this.props.lastName!
  }

  public set lastName(value: string) {
    this.props.lastName = value
  }

  public get email () {
    return this.props.email
  }

  public set email(value: string) {
    this.props.email = value
  }

  public get createdAt () {
    return this.props.createdAt
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value
  }

  public get updatedAt () {
    return this.props.updatedAt!
  }

  public set updatedAt(value: Date) {
    this.props.updatedAt = value
  }

  public get deletedAt () {
    return this.props.deletedAt!
  }

  public set deletedAt(value: Date) {
    this.props.deletedAt = value
  }
}