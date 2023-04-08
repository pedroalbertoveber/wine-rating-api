import { prisma } from '../../lib/prisma'
import { UserRepository } from '../UserRepository'
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
      }
    })

    return user
  }
}
