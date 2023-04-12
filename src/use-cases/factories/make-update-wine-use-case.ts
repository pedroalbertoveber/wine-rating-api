import { WineRepository } from '../../repositories/WineRepository'
import { UpdateWineUseCase } from '../update-wine-use-case'

export function makeUpdateWineUseCase(repository: WineRepository) {
  const useCase = new UpdateWineUseCase(repository)

  return useCase
}
