import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user'

describe('Update Wine (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update an existent wine', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/wines')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Casillero del Diablo',
        country: 'Argentina',
        type: 'Cabernet',
      })

    const wines = await request(app.server)
      .get('/wines')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })

    const response = await request(app.server)
      .put('/wines/edit')
      .query({
        id: wines.body.wines[0].id,
      })
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Casillero del Diablo Changed',
        country: 'Argentina',
        type: 'Cabernet',
      })

    console.log(response.body)

    expect(response.statusCode).toEqual(204)
  })
})
