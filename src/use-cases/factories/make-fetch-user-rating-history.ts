import { RatingRepository } from '../../repositories/RatingRepository'
import { FetchUserRatingHisoryUseCase } from '../fetch-user-rating-history-use-case'

export function makeFetchUserRatingHistory(repository: RatingRepository) {
  const useCase = new FetchUserRatingHisoryUseCase(repository)

  return useCase
}
