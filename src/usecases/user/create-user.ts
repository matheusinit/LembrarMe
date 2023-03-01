import { User } from "../../entities/user";
import { UserRepository } from "../../repository/user-repository";

type CreateUserParams = {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export class CreateUser {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(params: CreateUserParams) {
    const {firstName, lastName, email, password} = params

    const user = new User({
      firstName,
      lastName,
      email
    })

    await this.userRepository.createUser(user)
  }
}