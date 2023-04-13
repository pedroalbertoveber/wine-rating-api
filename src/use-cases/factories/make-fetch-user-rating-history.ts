import { PrismaRatingRepository } from '../../repositories/prisma/prisma-rating-repository'
import { FetchUserRatingHisoryUseCase } from '../fetch-user-rating-history-use-case'

export function makeFetchUserRatingHistory() {
  const repository = new PrismaRatingRepository()
  const useCase = new FetchUserRatingHisoryUseCase(repository)

  return useCase
}
