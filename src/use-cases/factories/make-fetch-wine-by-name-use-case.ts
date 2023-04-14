import { PrismaWineRepository } from '../../repositories/prisma/prisma-wine-repository'
import { FetchWinesByNameUseCase } from '../fetch-wine-by-name-use-case'

export function makeFetchWineByNameUseCase() {
  const repository = new PrismaWineRepository()
  const useCase = new FetchWinesByNameUseCase(repository)

  return useCase
}
