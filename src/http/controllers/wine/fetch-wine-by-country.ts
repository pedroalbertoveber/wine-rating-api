import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchWineByCountryUseCase } from '../../../use-cases/factories/make-fetch-wine-by-country-use-case'

export async function fetchWineByCountry(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchWineByCountryQuerySchema = z.object({
    country: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { country, page } = fetchWineByCountryQuerySchema.parse(request.query)

  const fetchWineByCountryUseCase = makeFetchWineByCountryUseCase()

  const { wines } = await fetchWineByCountryUseCase.execute({
    page,
    country,
  })

  return reply.status(200).send({
    wines,
  })
}
