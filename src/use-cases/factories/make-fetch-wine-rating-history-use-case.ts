import { RatingRepository } from '../../repositories/RatingRepository'
import { FetchWineRatingHistoryUseCase } from '../fetch-wine-rating-history-use-case'

export function makeFetchWineRatingHistoryUseCase(
  repository: RatingRepository,
) {
  const useCase = new FetchWineRatingHistoryUseCase(repository)

  return useCase
}
