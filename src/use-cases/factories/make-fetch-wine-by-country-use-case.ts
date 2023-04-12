import { WineRepository } from '../../repositories/WineRepository'
import { FetchWineByCountryUseCase } from '../fetch-wine-by-country'

export function makeFetchWineByCountryUseCase(repository: WineRepository) {
  const useCase = new FetchWineByCountryUseCase(repository)

  return useCase
}
