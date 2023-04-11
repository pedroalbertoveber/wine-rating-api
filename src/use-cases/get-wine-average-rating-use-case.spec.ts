import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { InMemoryRatingRepository } from '../repositories/in-memory/in-memory-rating-repository'
import { GetWineAverageRatingUseCase } from './get-wine-average-rating-use-case'

let wineRepository: InMemoryWineRepository
let ratingRepository: InMemoryRatingRepository

let sut: GetWineAverageRatingUseCase

describe('Get wine average rating', () => {
  beforeEach(() => {
    wineRepository = new InMemoryWineRepository()
    ratingRepository = new InMemoryRatingRepository()

    sut = new GetWineAverageRatingUseCase(ratingRepository)
  })

  it('should be able to get wine average rating', async () => {
    await wineRepository.create({
      id: 'wine-id',
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date(),
    })

    await ratingRepository.register({
      rate: 1,
      user_id: 'john-doe-id',
      wine_id: 'wine-id',
    })

    await ratingRepository.register({
      rate: 5,
      user_id: 'jane-doe-id',
      wine_id: 'wine-id',
    })

    const { wineAverageRating } = await sut.execute({ wineId: 'wine-id' })

    expect(wineAverageRating).toEqual((1 + 5) / 2)
  })
})
