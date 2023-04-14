import { FastifyInstance } from 'fastify'
import { verfiyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { fetchAll } from './fetch-all'
import { fetchWineByName } from './fetch-wine-by-name'
import { fetchWineByCountry } from './fetch-wine-by-country'
import { updateWine } from './update'

export async function wineRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verfiyJWT)

  app.post('/wines', create)
  app.get('/wines', fetchAll)
  app.get('/wines/search', fetchWineByName)
  app.get('/wines/country', fetchWineByCountry)
  app.put('/wines/edit', updateWine)
}
