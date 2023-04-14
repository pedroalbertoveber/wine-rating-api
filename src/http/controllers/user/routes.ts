import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', { onRequest: [verfiyJWT] }, profile)
}
