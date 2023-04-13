import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
