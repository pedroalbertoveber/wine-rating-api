import { PrismaRatingRepository } from '../../repositories/prisma/prisma-rating-repository'
import { FetchWineRatingHistoryUseCase } from '../fetch-wine-rating-history-use-case'

export function makeFetchWineRatingHistoryUseCase() {
  const repository = new PrismaRatingRepository()
  const useCase = new FetchWineRatingHistoryUseCase(repository)

  return useCase
}
