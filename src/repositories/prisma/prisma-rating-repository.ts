import { Prisma } from '@prisma/client'
import { RatingRepository } from '../RatingRepository'
import { prisma } from '../../lib/prisma'

export class PrismaRatingRepository implements RatingRepository {
  async register(data: Prisma.WineRatingUncheckedCreateInput) {
    const rate = await prisma.wineRating.create({
      data,
    })

    return rate
  }

  async getUserWineRatingHistory(userId: string, page = 1) {
    const rates = await prisma.wineRating.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return rates
  }

  async getWineRatingHistory(wineId: string, page = 1) {
    const rates = await prisma.wineRating.findMany({
      where: {
        wine_id: wineId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return rates
  }

  async userHasAlreadyRated(userId: string, wineId: string) {
    const hasAlreadyRated = await prisma.wineRating.findFirst({
      where: {
        user_id: userId,
        wine_id: wineId,
      },
    })

    return !!hasAlreadyRated
  }

  async getWineAverageRating(wineId: string) {
    const wineAverageRating = await prisma.wineRating.aggregate({
      where: {
        wine_id: wineId,
      },
      _avg: {
        rate: true,
      },
    })

    return Number(wineAverageRating)
  }
}
