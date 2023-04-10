import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryWineRepository } from '../repositories/in-memory/in-memory-wine-repository'
import { randomUUID } from 'node:crypto'
import { FetchWineByCountryUseCase } from './fetch-wine-by-country'

let wineRepository: InMemoryWineRepository
let sut: FetchWineByCountryUseCase

describe('Fetch wines by country', () => {
  beforeEach(() => {
    wineRepository = new InMemoryWineRepository()
    sut = new FetchWineByCountryUseCase(wineRepository)
  })

  it('should be able to get all wines by country', async () => {
    await wineRepository.create({
      id: randomUUID(),
      country: 'Chile',
      name: 'Concha y Toro',
      type: 'Merlot',
      created_at: new Date(),
    })

    await wineRepository.create({
      id: randomUUID(),
      country: 'Chile',
      name: 'Casillero del Diablo',
      type: 'Cabernet',
      created_at: new Date(),
    })

    await wineRepository.create({
      id: randomUUID(),
      country: 'Argentina',
      name: 'Gato Negro',
      type: 'Pinot',
      created_at: new Date(),
    })

    const { wines } = await sut.execute({ country: 'Chile', page: 1 })

    expect(wines).toHaveLength(2)
    expect(wines[0].name).toEqual('Concha y Toro')
    expect(wines[1].name).toEqual('Casillero del Diablo')
  })
})
