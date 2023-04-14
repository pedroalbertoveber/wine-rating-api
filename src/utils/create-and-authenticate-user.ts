import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'some-password',
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
