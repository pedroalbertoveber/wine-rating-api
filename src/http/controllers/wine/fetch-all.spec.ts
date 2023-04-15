import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'crypto'

describe('Fetch All Wines (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all wines', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    await prisma.wine.createMany({
      data: [
        {
          id: randomUUID(),
          country: 'Chile',
          name: 'Concha y Toro',
          type: 'Merlot',
          created_at: new Date(),
        },
        {
          id: randomUUID(),
          country: 'Argentina',
          name: 'Casillero del Diablo',
          type: 'Cabernet',
          created_at: new Date(),
        },
      ],
    })

    const response = await request(app.server)
      .get('/wines')
      .query({
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.wines).toHaveLength(2)
  })
})
