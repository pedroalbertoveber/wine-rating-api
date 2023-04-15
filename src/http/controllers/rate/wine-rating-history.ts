import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchWineRatingHistoryUseCase } from '../../../use-cases/factories/make-fetch-wine-rating-history-use-case'

export async function wineRatingHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const wineRatingHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    wineId: z.string(),
  })

  const { page, wineId } = wineRatingHistoryQuerySchema.parse(request.query)

  const fetchWineRatingHistoryUseCase = makeFetchWineRatingHistoryUseCase()

  const { rates } = await fetchWineRatingHistoryUseCase.execute({
    page,
    wineId,
  })

  return reply.status(200).send({ rates })
}
