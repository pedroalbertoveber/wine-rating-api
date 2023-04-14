import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'

describe('Fetch All Wines (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all wines', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Some Wine',
        country: 'United Stats',
        type: 'Cabernet',
      })

    await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Another Wine',
        country: 'Chile',
        type: 'Merlot',
      })

    const response = await request(app.server)
      .get('/wines')
      .query({
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    console.log(response)

    expect(response.statusCode).toEqual(200)
    expect(response.body.wines[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Some Wine',
      }),
    )
  })
})
