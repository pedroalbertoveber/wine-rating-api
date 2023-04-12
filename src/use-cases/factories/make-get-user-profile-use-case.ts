import { UserRepository } from '../../repositories/UserRepository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase(repository: UserRepository) {
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
