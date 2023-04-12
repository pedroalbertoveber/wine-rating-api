import { UserRepository } from '../../repositories/UserRepository'
import { RegisterUserUseCase } from '../register-user-use-case'

export function makeRegisterUserUseCase(repository: UserRepository) {
  const useCase = new RegisterUserUseCase(repository)

  return useCase
}
