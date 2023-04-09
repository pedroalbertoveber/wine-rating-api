import { Prisma, Wine } from '@prisma/client'

export interface WineRepository {
  create(data: Prisma.WineCreateInput): Promise<Wine>
  fetchWinesByCountry(country: string): Promise<Wine[] | null>
  fetchAllWines(): Promise<Wine[]>
  fetchWineByName(name: string): Promise<Wine[]>
}