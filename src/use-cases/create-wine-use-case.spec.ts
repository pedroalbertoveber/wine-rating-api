import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { CreateWineUseCase } from './create-wine-use-case'

describe('Create Wine Use Case', () => {

  let wineRepository: InMemoryWineRepository
  let sut: CreateWineUseCase

  beforeEach(async () => {
    wineRepository = new InMemoryWineRepository()
    sut = new CreateWineUseCase(wineRepository)

  })

  it('should be able to rate a wine', async () => {
    const { wine } = await sut.execute({
      name: 'Concha y Toro',
      country: 'Chile',
      type: 'Merlot'
    })

    expect(wine.id).toEqual(expect.any(String))
  })
})