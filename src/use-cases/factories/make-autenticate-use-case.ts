import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
