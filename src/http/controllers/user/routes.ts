import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verfiyJWT] }, profile)
}
