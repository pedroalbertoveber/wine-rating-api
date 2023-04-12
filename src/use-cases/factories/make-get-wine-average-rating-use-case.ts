import { RatingRepository } from '../../repositories/RatingRepository'
import { GetWineAverageRatingUseCase } from '../get-wine-average-rating-use-case'

export function makeGetWineAverageRatingUseCase(repository: RatingRepository) {
  const useCase = new GetWineAverageRatingUseCase(repository)

  return useCase
}
