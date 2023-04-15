import { WineRating } from '@prisma/client'
import { RatingRepository } from '../repositories/rating-repository'

interface FetchUserRatingHisoryUseCaseRequest {
  page?: number
  userId: string
}

interface FetchUserRatingHisoryUseCaseResponse {
  rates: WineRating[]
}

export class FetchUserRatingHisoryUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    page = 1,
    userId,
  }: FetchUserRatingHisoryUseCaseRequest): Promise<FetchUserRatingHisoryUseCaseResponse> {
    const rates = await this.ratingRepository.getUserWineRatingHistory(
      userId,
      page,
    )

    return {
      rates,
    }
  }
}
