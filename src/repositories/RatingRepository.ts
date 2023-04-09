import { Prisma, WineRating } from "@prisma/client";

export interface RatingRepository {
  register(data: Prisma.WineRatingUncheckedCreateInput): Promise<WineRating>
}