import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../register-user-use-case'

export function makeRegisterUserUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new RegisterUserUseCase(repository)

  return useCase
}
