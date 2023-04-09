import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)

    userRepository.register({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to authenticate an user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'janedoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
    sut.execute({
      email: 'johndow@example.com',
      password: 'wrong-password',
    })
  ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})