import { PrismaWineRepository } from '../../repositories/prisma/prisma-wine-repository'
import { FetchWineByCountryUseCase } from '../fetch-wine-by-country'

export function makeFetchWineByCountryUseCase() {
  const repository = new PrismaWineRepository()
  const useCase = new FetchWineByCountryUseCase(repository)

  return useCase
}
