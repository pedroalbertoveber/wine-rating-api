import { RatingRepository } from '../repositories/RatingRepository'

interface GetWineAverageRatingUseCaseRequest {
  wineId: string
}

interface GetWineAverageRatingUseCaseResponse {
  wineAverageRating: Number
}

export class GetWineAverageRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    wineId,
  }: GetWineAverageRatingUseCaseRequest): Promise<GetWineAverageRatingUseCaseResponse> {
    const wineAverageRating = await this.ratingRepository.getWineAverageRating(
      wineId,
    )

    return {
      wineAverageRating,
    }
  }
}
