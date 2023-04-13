import { PrismaWineRepository } from '../../repositories/prisma/prisma-wine-repository'
import { UpdateWineUseCase } from '../update-wine-use-case'

export function makeUpdateWineUseCase() {
  const repository = new PrismaWineRepository()
  const useCase = new UpdateWineUseCase(repository)

  return useCase
}
