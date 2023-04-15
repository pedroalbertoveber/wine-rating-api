import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

interface createAndAuthenticateUserRequest {
  app: FastifyInstance
  isAdmin?: boolean
}

export async function createAndAuthenticateUser({
  app,
  isAdmin = false,
}: createAndAuthenticateUserRequest) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('some-password', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'johndoe@example.com',
    password: 'some-password',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
