import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { FetchAllWinesUseCase } from './fetch-all-wines-use-case'
import { randomUUID } from 'node:crypto'

let wineRepository: InMemoryWineRepository
let sut: FetchAllWinesUseCase

describe('Register Use Case', () => {

  beforeEach(() => {
    wineRepository = new InMemoryWineRepository()
    sut = new FetchAllWinesUseCase(wineRepository)
  })

  it('should be able to get all wines', async () => {
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

    const { wines } = await sut.execute({ page: 1 })

    expect(wines).toHaveLength(2)
    expect(wines[0].name).toEqual('Concha y Toro')
  })

  
  it('should be able to get all wines paginated', async () => {
    for(let i = 1; i <= 22; i++) {
      await wineRepository.create({
        name: `Wine ${i}`,
        country: 'Chile',
        type: 'Cabernet Suvignon',
        created_at: new Date(),
        id: randomUUID(),
      })
    }

    const { wines } = await sut.execute({ page: 2 })

    expect(wines).toHaveLength(2)
    expect(wines[0].name).toEqual('Wine 21')
  })
})