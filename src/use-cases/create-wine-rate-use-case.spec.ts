import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryRatingRepository } from '../repositories/in-memory/in-memory-rating-repository'
import { CreateWineRatingUseCase } from './create-wine-rate-use-case'
import { InvalidWineRateError } from './errors/invalid-wine-rate-error'
import { UnauthorizedToRateError } from './errors/unauthorized-to-rate-error'

describe('Create wine rating', () => {

  let ratingRepository: InMemoryRatingRepository
  let sut: CreateWineRatingUseCase

  beforeEach(async () => {
    ratingRepository = new InMemoryRatingRepository()
    sut = new CreateWineRatingUseCase(ratingRepository)

  })

  it('should be able to rate a wine', async () => {
    const { rate } = await sut.execute({
      user_id: 'user_id',
      wine_id: 'wine_id',
      wineRate: 3,
    })

    expect(rate.id).toEqual(expect.any(String))
  })

  it ('should not let user rate a wine out of the range 1/5', async () => {
    await expect(() => 
      sut.execute({
        user_id: 'user_id',
        wine_id: 'wine_id',
        wineRate: 0
      })
    ).rejects.toBeInstanceOf(InvalidWineRateError)

    await expect(() => 
      sut.execute({
        user_id: 'user_id',
        wine_id: 'wine_id',
        wineRate: 6
      })
    ).rejects.toBeInstanceOf(InvalidWineRateError)
  })

  it('should not let user rate the same wine twice', async () => {
    await sut.execute({
      user_id: 'user_id',
      wine_id: 'wine_id',
      wineRate: 3,
    })

    await expect(() => 
      sut.execute({
        user_id: 'user_id',
        wine_id: 'wine_id',
        wineRate: 2
      })
    ).rejects.toBeInstanceOf(UnauthorizedToRateError)

  })
})