import { WineRepository } from '../../repositories/WineRepository'
import { FetchWinesByNameUseCase } from '../fetch-wine-by-name-use-case'

export function makeCreateWineUseCase(repository: WineRepository) {
  const useCase = new FetchWinesByNameUseCase(repository)

  return useCase
}
