import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryRatingRepository } from '../repositories/in-memory/in-memory-rating-repository'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { Prisma } from '@prisma/client'
import { FetchWineRatingHistoryUseCase } from './fetch-wine-rating-history-use-case'

let ratingRepository: InMemoryRatingRepository
let userRepository: InMemoryUserRepository
let wineRepository: InMemoryWineRepository

let sut: FetchWineRatingHistoryUseCase

describe('Fetch Wine Rating History', () => {
  beforeEach(() => {
    ratingRepository = new InMemoryRatingRepository()
    userRepository = new InMemoryUserRepository()
    wineRepository = new InMemoryWineRepository()

    sut = new FetchWineRatingHistoryUseCase(ratingRepository)
  })

  it('should be able to get all wine rating history', async () => {
    await userRepository.register({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'some-password',
      created_at: new Date(),
    })

    await wineRepository.create({
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date(),
    })

    await ratingRepository.register({
      rate: 3,
      user_id: 'john-id',
      wine_id: 'another-wine-id',
      created_at: new Date(),
    })

    await ratingRepository.register({
      rate: 2,
      user_id: 'john-id',
      wine_id: 'wine-id',
      created_at: new Date(),
    })

    const { rates } = await sut.execute({
      wineId: 'wine-id',
    })

    expect(rates).toHaveLength(1)
    expect(rates[0].rate).toEqual(new Prisma.Decimal(2))
  })
})
