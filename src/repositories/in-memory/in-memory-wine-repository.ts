import { Prisma, Wine } from "@prisma/client";
import { WineRepository } from "../WineRepository";
import { randomUUID } from "node:crypto";

export class InMemoryWineRepository implements WineRepository {

  public items:Wine[] = []

  async create(data: Prisma.WineCreateInput) {
    const wine:Wine = {
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
    .filter(item => item.country === country)
    .slice((page -1) * 20, 20 * page)

    return wines
  }

  async fetchAllWines(page: number): Promise<Wine[]> {
    const wines = this.items
    .slice((page -1) * 20, 20 * page)

    return wines
  }
  async fetchWineByName(name: string, page: number): Promise<Wine[]> {
    const wines = this.items
    .filter(item => item.name.includes(name))
    .slice((page -1) * 20, 20 * page)

    return wines
  }
  
}