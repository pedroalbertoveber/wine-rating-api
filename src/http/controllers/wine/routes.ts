import { FastifyInstance } from 'fastify'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'

export async function wineRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfiyJWT)

  app.post('/wines', create)
}
