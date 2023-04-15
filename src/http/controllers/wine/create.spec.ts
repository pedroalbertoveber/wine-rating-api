import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'

describe('Create Wine (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a wine', async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true })

    const response = await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Some Wine',
        country: 'United Stats',
        type: 'Cabernet',
      })

    expect(response.statusCode).toEqual(201)
  })
})
