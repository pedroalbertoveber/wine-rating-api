import { PrismaWineRepository } from '../../repositories/prisma/prisma-wine-repository'
import { CreateWineUseCase } from '../create-wine-use-case'

export function makeCreateWineRateUseCase() {
  const repository = new PrismaWineRepository()
  const useCase = new CreateWineUseCase(repository)

  return useCase
}
