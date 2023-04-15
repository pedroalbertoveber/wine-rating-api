import { Wine } from '@prisma/client'
import { WineRepository } from '../repositories/wine-repository'

interface FetchWineByCountryUseCaseRequest {
  page?: number
  country: string
}

interface FetchWineByCountryUseCaseResponse {
  wines: Wine[]
}

export class FetchWineByCountryUseCase {
  constructor(private wineRepository: WineRepository) {}

  async execute({
    page = 1,
    country,
  }: FetchWineByCountryUseCaseRequest): Promise<FetchWineByCountryUseCaseResponse> {
    const wines = await this.wineRepository.fetchWinesByCountry(country, page)

    return {
      wines,
    }
  }
}
