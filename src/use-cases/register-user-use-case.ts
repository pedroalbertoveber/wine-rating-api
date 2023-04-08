import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '@prisma/client'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'

interface RegisterUserUseCaseRequest {
  name: string,
  email: string,
  password: string,
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
     
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const user = await this.userRepository.register({
      email,
      name,
      password_hash,
    })

    return {
      user
    }

  }
}