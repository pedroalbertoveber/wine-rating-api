import { WineRepository } from '../../repositories/WineRepository'
import { FetchAllWinesUseCase } from '../fetch-all-wines-use-case'

export function makeFetchAllWinesUseaCase(repository: WineRepository) {
  const useCase = new FetchAllWinesUseCase(repository)

  return useCase
}
