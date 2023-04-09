import { RatingRepository } from '../repositories/RatingRepository'
import { User, WineRating } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InvalidWineRateError } from './errors/invalid-wine-rate-error'

interface CreateWineRateUseCaseRequest {
  user_id: string,
  wine_id: string,
  wineRate: number,
}

interface CreateWineRateUseCaseResponse {
  rate: WineRating
}

export class CreateWineRatingUseCase {
  constructor(private ratingRepository: RatingRepository) {}

  async execute({
    wineRate,
    user_id,
    wine_id,
  }: CreateWineRateUseCaseRequest): Promise<CreateWineRateUseCaseResponse> {
    const higherWineRate = 5
    const lowerWineRate = 1

    if (wineRate < lowerWineRate || wineRate > higherWineRate) {
      throw new InvalidWineRateError()
    }

    const rate = await this.ratingRepository.register({
      user_id,
      wine_id,
      rate: wineRate,
    })

    return {
      rate
    }
  }
}