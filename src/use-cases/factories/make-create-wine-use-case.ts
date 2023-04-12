import { WineRepository } from '../../repositories/WineRepository'
import { CreateWineUseCase } from '../create-wine-use-case'

export function makeCreateWineUseCase(repository: WineRepository) {
  const useCase = new CreateWineUseCase(repository)

  return useCase
}
