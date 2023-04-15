import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'
import { app } from '../../../app'
import request from 'supertest'

describe('Create Wine Rate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new wine rate', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concha y Toro',
        type: 'Merlot',
        country: 'Chile',
      })

    const allWines = await request(app.server)
      .get('/wines')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })

    const response = await request(app.server)
      .post('/wines/rating')
      .set('Authorization', `Bearer ${token}`)
      .send({
        wineRate: 3,
        wine_id: allWines.body.wines[0].id,
      })

    expect(response.statusCode).toBe(201)
  })
})
