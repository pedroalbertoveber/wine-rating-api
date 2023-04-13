import { PrismaRatingRepository } from '../../repositories/prisma/prisma-rating-repository'
import { CreateWineRatingUseCase } from '../create-wine-rate-use-case'

export function makeCreateWineRateUseCase() {
  const repository = new PrismaRatingRepository()
  const useCase = new CreateWineRatingUseCase(repository)

  return useCase
}
