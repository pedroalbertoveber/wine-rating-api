import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    })

    const response = await request(app.server).post('/session').send({
      email: 'johndoe@example.com',
      password: 'some-password',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
