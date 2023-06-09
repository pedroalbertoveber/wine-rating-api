import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    })

    expect(response.statusCode).toEqual(201)
  })
})
