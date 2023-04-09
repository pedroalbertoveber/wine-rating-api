import { RatingRepository } from "../RatingRepository";
import { randomUUID } from "node:crypto";
import { Prisma, WineRating } from "@prisma/client";

export class InMemoryRatingRepository implements RatingRepository {

  public items:WineRating[] = []

  async register(data: Prisma.WineRatingUncheckedCreateInput) {
    
    const rating:WineRating = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      wine_id: data.wine_id,
      rate: new Prisma.Decimal(data.rate.toString())
    }

    this.items.push(rating)

    return rating
  }

  async getUserWineRatingHistory(userId: string, page=1) {
    const ratingHistory = this.items
      .filter(item => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    
    return ratingHistory
  }

  async userHasAlreadyRated(userId: string, wineId: string): Promise<boolean> {
    const hasAlreadyRated = this.items.some(item => item.user_id === userId && item.wine_id === wineId)

    return hasAlreadyRated
  }
}