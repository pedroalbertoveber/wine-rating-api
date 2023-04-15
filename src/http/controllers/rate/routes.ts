import { FastifyInstance } from 'fastify'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { userRatingHistory } from './user-rating-history'
import { wineRatingHistory } from './wine-rating-history'

export async function ratingRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfiyJWT)

  app.post('/wines/rating', create)
  app.get('/wines/ratings', wineRatingHistory)
  app.get('/me/ratings', userRatingHistory)
}
