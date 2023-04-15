import { FastifyInstance } from 'fastify'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { fetchAll } from './fetch-all'
import { fetchWineByName } from './fetch-wine-by-name'
import { fetchWineByCountry } from './fetch-wine-by-country'
import { updateWine } from './update'
import { verifyUserRole } from '../../middlewares/verify-user-role'

export async function wineRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfiyJWT)

  app.post('/wines', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.put('/wines/edit', { onRequest: [verifyUserRole('ADMIN')] }, updateWine)

  app.get('/wines', fetchAll)
  app.get('/wines/search', fetchWineByName)
  app.get('/wines/country', fetchWineByCountry)
}
