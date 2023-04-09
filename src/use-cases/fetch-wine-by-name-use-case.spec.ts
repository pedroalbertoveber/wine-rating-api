import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { randomUUID } from 'node:crypto'
import { FetchWinesByNameUseCase } from './fetch-wine-by-name-use-case'

let wineRepository: InMemoryWineRepository
let sut: FetchWinesByNameUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    wineRepository = new InMemoryWineRepository()
    sut = new FetchWinesByNameUseCase(wineRepository)
  })

  it('should be able to get all wines containg searched name', async () => {
    await wineRepository.create({
      id: randomUUID(),
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date()
    })

    await wineRepository.create({
      id: randomUUID(),
      country: 'Argentina',
      name: 'Gato Negro',
      type: 'Pinot',
      created_at: new Date()
    })

    const { wines } = await sut.execute({ name: 'Concha', page: 1 })

    expect(wines).toHaveLength(1)
    expect(wines[0].name).toEqual('Concha y Toro')
  })
})