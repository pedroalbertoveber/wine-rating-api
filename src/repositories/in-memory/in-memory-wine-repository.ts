import { Prisma, Wine } from '@prisma/client'
import { WineRepository } from '../WineRepository'
import { randomUUID } from 'node:crypto'

interface UpdateWineRequest {
  name: string
  country: string
  id: string
  type: string
}

export class InMemoryWineRepository implements WineRepository {
  public items: Wine[] = []

  async create(data: Prisma.WineCreateInput) {
    const wine: Wine = {
      id: randomUUID(),
      name: data.name,
      country: data.country,
      created_at: new Date(),
      type: data.type,
    }

    this.items.push(wine)

    return wine
  }

  async fetchWinesByCountry(country: string, page: number): Promise<Wine[]> {
    const wines = this.items
      .filter((item) => item.country === country)
      .slice((page - 1) * 20, 20 * page)

    return wines
  }

  async fetchAllWines(page: number): Promise<Wine[]> {
    const wines = this.items.slice((page - 1) * 20, 20 * page)

    return wines
  }

  async fetchWineByName(name: string, page: number): Promise<Wine[]> {
    const wines = this.items
      .filter((item) => item.name.includes(name))
      .slice((page - 1) * 20, 20 * page)

    return wines
  }

  async findWineById(wineId: string) {
    const wine = this.items.find((item) => item.id === wineId)

    if (!wine) {
      return null
    }

    return wine
  }

  async update({ id, country, name, type }: UpdateWineRequest) {
    const indexOfSelectedWine = this.items.findIndex((item) => item.id === id)

    if (indexOfSelectedWine < 0) {
      throw new Error()
    }

    let wine = this.items[indexOfSelectedWine]

    wine = {
      ...wine,
      country,
      name,
      type,
    }

    this.items[indexOfSelectedWine] = wine

    return wine
  }
}
