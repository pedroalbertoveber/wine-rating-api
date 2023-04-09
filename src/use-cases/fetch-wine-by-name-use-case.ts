import { Wine } from "@prisma/client";
import { WineRepository } from "../repositories/WineRepository";

interface FetchWinesByNameUseCaseRequest {
  page?: number,
  name: string,
}

interface FetchWinesByNameUseCaseResponse {
  wines: Wine[]
}

export class FetchWinesByNameUseCase {
  constructor(private wineRepository: WineRepository) {}

  async execute({ page = 1, name }: FetchWinesByNameUseCaseRequest): Promise<FetchWinesByNameUseCaseResponse> {
    const wines = await this.wineRepository.fetchWineByName(name ,page)

    return {
      wines
    }
  }
}