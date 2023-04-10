import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../UserRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
      email: data.email,
      password_hash: data.password_hash,
    }

    await this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
