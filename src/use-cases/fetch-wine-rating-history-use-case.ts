import { WineRating } from '@prisma/client'
import { RatingRepository } from '../repositories/rating-repository'

interface FetchWineRatingHistoryUseCaseRequest {
  page?: number
  wineId: string
}

interface FetchWineRatingHistoryUseCaseResponse {
  rates: WineRating[]
}

export class FetchWineRatingHistoryUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    page = 1,
    wineId,
  }: FetchWineRatingHistoryUseCaseRequest): Promise<FetchWineRatingHistoryUseCaseResponse> {
    const rates = await this.ratingRepository.getWineRatingHistory(wineId, page)

    return {
      rates,
    }
  }
}
