import { PrismaRatingRepository } from '../../repositories/prisma/prisma-rating-repository'
import { GetWineAverageRatingUseCase } from '../get-wine-average-rating-use-case'

export function makeGetWineAverageRatingUseCase() {
  const repository = new PrismaRatingRepository()
  const useCase = new GetWineAverageRatingUseCase(repository)

  return useCase
}
