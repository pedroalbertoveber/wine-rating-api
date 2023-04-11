import { describe, it, expect, beforeEach } from 'vitest'
import { FetchUserRatingHisoryUseCase } from './fetch-user-rating-history-use-case'
import { InMemoryRatingRepository } from '../repositories/in-memory/in-memory-rating-repository'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { Prisma } from '@prisma/client'

let ratingRepository: InMemoryRatingRepository
let userRepository: InMemoryUserRepository
let wineRepository: InMemoryWineRepository

let sut: FetchUserRatingHisoryUseCase

describe('Fetch User Rating History', () => {
  beforeEach(() => {
    ratingRepository = new InMemoryRatingRepository()
    userRepository = new InMemoryUserRepository()
    wineRepository = new InMemoryWineRepository()

    sut = new FetchUserRatingHisoryUseCase(ratingRepository)
  })

  it('should be able to get all user rating history', async () => {
    await userRepository.register({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'some-password',
      created_at: new Date(),
      id: 'john-id',
    })

    await wineRepository.create({
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date(),
      id: 'wine-id',
    })

    await ratingRepository.register({
      rate: 3,
      user_id: 'john-id',
      wine_id: 'wine-id',
      created_at: new Date(),
      id: 'rate-01',
    })

    await ratingRepository.register({
      rate: 2,
      user_id: 'jane-id',
      wine_id: 'wine-id',
      created_at: new Date(),
      id: 'rate-02',
    })

    const { rates } = await sut.execute({
      userId: 'john-id',
    })

    expect(rates).toHaveLength(1)
    expect(rates[0].rate).toEqual(new Prisma.Decimal(3))
  })
})
