import { FastifyInstance } from 'fastify'
import { register } from './register'

export function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  return app
}
