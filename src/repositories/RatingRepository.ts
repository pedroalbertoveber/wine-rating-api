import { Prisma, WineRating } from '@prisma/client'

export interface RatingRepository {
  register(data: Prisma.WineRatingUncheckedCreateInput): Promise<WineRating>
  getUserWineRatingHistory(userId: string, page?: number): Promise<WineRating[]>
  getWineRatingHistory(wineId: string, page?: number): Promise<WineRating[]>
  userHasAlreadyRated(userId: string, wineId: string): Promise<boolean>
  getWineAverageRating(wineId: string): Promise<Number>
}
