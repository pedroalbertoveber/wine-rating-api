import { UserRepository } from '../repositories/UserRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterUserUseCaseRequest {
  userId: string,
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {

    const user = await this.userRepository.findByUserId(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}