import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  register(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUserId (userId: string): Promise<User | null>
}
