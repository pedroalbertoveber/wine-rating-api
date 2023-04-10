import { RatingRepository } from '../repositories/RatingRepository'
import { WineRating } from '@prisma/client'
import { InvalidWineRateError } from './errors/invalid-wine-rate-error'
import { UnauthorizedToRateError } from './errors/unauthorized-to-rate-error'

interface CreateWineRateUseCaseRequest {
  user_id: string
  wine_id: string
  wineRate: number
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

    const hasUserAlredyRated = await this.ratingRepository.userHasAlreadyRated(
      user_id,
      wine_id,
    )

    if (hasUserAlredyRated) {
      throw new UnauthorizedToRateError()
    }

    const rate = await this.ratingRepository.register({
      user_id,
      wine_id,
      rate: wineRate,
    })

    return {
      rate,
    }
  }
}
