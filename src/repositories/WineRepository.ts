import { Prisma, Wine } from '@prisma/client'

export interface WineRepository {
  create(data: Prisma.WineCreateInput): Promise<Wine>
  fetchWinesByCountry(country: string, page: number): Promise<Wine[]>
  fetchAllWines(page: number): Promise<Wine[]>
  fetchWineByName(name: string, page: number): Promise<Wine[]>
}