import { Prisma, WineRating } from "@prisma/client";
import { RatingRepository } from "../RatingRepository";
import { randomUUID } from "node:crypto";

export class InMemoryRatingRepository implements RatingRepository {

  public items:WineRating[] = []

  async register(data: Prisma.WineRatingUncheckedCreateInput) {
    
    const rating:WineRating = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      wine_id: data.wine_id,
    }

    this.items.push(rating)

    return rating
  }
}