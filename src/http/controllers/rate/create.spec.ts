import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'
import { app } from '../../../app'
import request from 'supertest'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'crypto'

describe('Create Wine Rate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new wine rate', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const wine = await prisma.wine.create({
      data: {
        name: 'Concha y Toro',
        country: 'Chile',
        type: 'Merlot',
        created_at: new Date(),
        id: randomUUID(),
      },
    })

    const response = await request(app.server)
      .post('/wines/rating')
      .set('Authorization', `Bearer ${token}`)
      .send({
        wineRate: 3,
        wine_id: wine.id,
      })

    expect(response.statusCode).toBe(201)
  })
})
