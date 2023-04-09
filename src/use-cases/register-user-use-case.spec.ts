import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'

let userRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with an already existent e-mail', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(async () => 
      sut.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })
})