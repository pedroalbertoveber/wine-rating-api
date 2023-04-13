import { PrismaWineRepository } from '../../repositories/prisma/prisma-wine-repository'
import { FetchAllWinesUseCase } from '../fetch-all-wines-use-case'

export function makeFetchAllWinesUseaCase() {
  const repository = new PrismaWineRepository()
  const useCase = new FetchAllWinesUseCase(repository)

  return useCase
}
