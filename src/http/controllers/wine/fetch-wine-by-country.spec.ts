import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'node:crypto'

describe('Fetch Wines by Country (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch wines that matches with country', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    await prisma.wine.createMany({
      data: [
        {
          name: 'Concha y Toro',
          country: 'Chile',
          type: 'Merlot',
          created_at: new Date(),
          id: randomUUID(),
        },
        {
          name: 'Casillero del Diablo',
          country: 'Argentina',
          type: 'Cabernet',
          created_at: new Date(),
          id: randomUUID(),
        },
      ],
    })

    const response = await request(app.server)
      .get('/wines/country')
      .query({
        country: 'argentina',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.wines).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Casillero del Diablo',
        type: 'Cabernet',
        country: 'Argentina',
      }),
    ])
  })
})
