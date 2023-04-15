import { FastifyInstance } from 'fastify'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { userRatingHistory } from './user-rating-history'
import { wineRatingHistory } from './wine-rating-history'
import { getWineAverageRating } from './wine-average-rating'
import { verifyUserRole } from '../../middlewares/verify-user-role'

export async function ratingRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfiyJWT)

  app.post('/wines/rating', { onRequest: [verifyUserRole('MEMBER')] }, create)
  app.get(
    '/wines/ratings',
    { onRequest: [verifyUserRole('ADMIN')] },
    wineRatingHistory,
  )

  app.get('/wine/ratings/average', getWineAverageRating)
  app.get(
    '/me/ratings',
    { onRequest: [verifyUserRole('MEMBER')] },
    userRatingHistory,
  )
}
