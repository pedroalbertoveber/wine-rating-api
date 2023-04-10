import { Prisma, WineRating } from '@prisma/client'

export interface RatingRepository {
  register(data: Prisma.WineRatingUncheckedCreateInput): Promise<WineRating>
  getUserWineRatingHistory(userId: string, page?: number): Promise<WineRating[]>
  userHasAlreadyRated(userId: string, wine_id: string): Promise<boolean>
}
