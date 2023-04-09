import { Wine } from "@prisma/client";
import { WineRepository } from "../repositories/WineRepository";

interface FetchAllWinesUseCaseRequest {
  page: number
}

interface FetchAllWinesUseCaseResponse {
  wines: Wine[]
}

export class FetchAllWinesUseCase {
  constructor(private wineRepository: WineRepository) {}

  async execute({ page = 1 }: FetchAllWinesUseCaseRequest): Promise<FetchAllWinesUseCaseResponse> {
    const wines = await this.wineRepository.fetchAllWines(page)

    return {
      wines
    }
  }
}