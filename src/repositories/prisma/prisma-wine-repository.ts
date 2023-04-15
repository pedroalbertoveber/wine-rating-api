import { Prisma, Wine } from '@prisma/client'
import { WineRepository } from '../wine-repository'
import { prisma } from '../../lib/prisma'

export class PrismaWineRepository implements WineRepository {
  async create(data: Prisma.WineCreateInput): Promise<Wine> {
    const wine = await prisma.wine.create({
      data,
    })

    return wine
  }

  async update(data: Prisma.WineCreateInput): Promise<Wine> {
    const wine = await prisma.wine.update({
      where: {
        id: data.id,
      },
      data,
    })

    return wine
  }

  async fetchWinesByCountry(country: string, page: number): Promise<Wine[]> {
    const wines = await prisma.wine.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return wines
  }

  async fetchAllWines(page: number): Promise<Wine[]> {
    const wines = await prisma.wine.findMany({
      skip: (page - 1) * 20,
      take: 20,
    })

    return wines
  }

  async fetchWineByName(name: string, page: number): Promise<Wine[]> {
    const wines = await prisma.wine.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return wines
  }

  async findWineById(wineId: string): Promise<Wine | null> {
    const wine = await prisma.wine.findUnique({
      where: {
        id: wineId,
      },
    })

    return wine
  }
}
