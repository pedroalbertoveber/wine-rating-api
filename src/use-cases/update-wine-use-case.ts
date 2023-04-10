import { Wine } from '@prisma/client'
import { WineRepository } from '../repositories/WineRepository'

interface UpdateWineUseCaseRequest {
  name: string
  type: string
  country: string
  id: string
}

interface UpdateWineUseCaseResponse {
  wine: Wine
}

export class UpdateWineUseCase {
  constructor(private wineRepository: WineRepository) {}

  async execute(
    data: UpdateWineUseCaseRequest,
  ): Promise<UpdateWineUseCaseResponse> {
    const wine = await this.wineRepository.update(data)

    return {
      wine,
    }
  }
}
