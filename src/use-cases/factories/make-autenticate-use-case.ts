import { UserRepository } from '../../repositories/UserRepository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase(repository: UserRepository) {
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
