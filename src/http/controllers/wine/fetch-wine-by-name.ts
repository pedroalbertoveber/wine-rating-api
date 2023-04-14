import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchWineByNameUseCase } from '../../../use-cases/factories/make-fetch-wine-by-name-use-case'

export async function fetchWineByName(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchWineByNameQuerySchema = z.object({
    name: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { name, page } = fetchWineByNameQuerySchema.parse(request.query)

  const fetchWineByNameUseCase = makeFetchWineByNameUseCase()

  const { wines } = await fetchWineByNameUseCase.execute({
    page,
    name,
  })

  return reply.status(200).send({
    wines,
  })
}
