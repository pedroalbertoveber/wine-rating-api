import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'
import { app } from '../../../app'
import request from 'supertest'
import { prisma } from '../../../lib/prisma'

describe('Fetch User Rating History (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user rating history', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concha y Toro',
        type: 'Merlot',
        country: 'Chile',
      })

    const wine = await prisma.wine.findFirstOrThrow()
    const user = await prisma.user.findFirstOrThrow()

    await prisma.wineRating.createMany({
      data: [
        { rate: 4, user_id: user.id, wine_id: wine.id },
        { rate: 2, user_id: user.id, wine_id: wine.id },
      ],
    })

    const response = await request(app.server)
      .get('/me/ratings')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.rates).toHaveLength(2)
  })
})
