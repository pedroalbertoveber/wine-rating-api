import { compare } from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterUserUseCaseRequest {
  email: string,
  password: string,
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatches = await compare(password, user.password_hash)

    if (!doesPasswordsMatches) {
      throw new InvalidCredentialsError()
    } 

    return {
      user
    }
  }
}