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
}