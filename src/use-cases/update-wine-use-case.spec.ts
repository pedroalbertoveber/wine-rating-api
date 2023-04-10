import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { UpdateWineUseCase } from './update-wine-use-case'
import { randomUUID } from 'node:crypto'

describe('Update Wine Use Case', () => {
  let wineRepository: InMemoryWineRepository
  let sut: UpdateWineUseCase

  beforeEach(async () => {
    wineRepository = new InMemoryWineRepository()
    sut = new UpdateWineUseCase(wineRepository)
  })

  it('should be able to rate a wine', async () => {
    const wine = await wineRepository.create({
      id: randomUUID(),
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date(),
    })

    await sut.execute({
      id: wine.id,
      country: 'Different Country',
      name: wine.name,
      type: wine.type,
    })

    expect(wineRepository.items[0].country).toEqual('Different Country')
  })
})
