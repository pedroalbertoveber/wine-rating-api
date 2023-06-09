import { prisma } from '../../lib/prisma'
import { UserRepository } from '../user-repository'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  async register(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
