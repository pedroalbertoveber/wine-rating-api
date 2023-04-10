import { Wine } from '@prisma/client'
import { WineRepository } from '../repositories/WineRepository'
import { randomUUID } from 'node:crypto'

interface CreateWineUseCaseRequest {
  name: string
  type: string
  country: string
}

interface CreateWineUseCaseResponse {
  wine: Wine
}

export class CreateWineUseCase {
  constructor(private wineRepository: WineRepository) {}

  async execute(
    data: CreateWineUseCaseRequest,
  ): Promise<CreateWineUseCaseResponse> {
    const wine = await this.wineRepository.create({
      id: randomUUID(),
      country: data.country,
      created_at: new Date(),
      name: data.name,
      type: data.type,
    })

    return {
      wine,
    }
  }
}
