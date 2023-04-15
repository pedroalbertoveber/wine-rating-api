import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserRatingHistory } from '../../../use-cases/factories/make-fetch-user-rating-history'

export async function userRatingHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userRatingHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = userRatingHistoryQuerySchema.parse(request.query)

  const fetchUserRatingHistoryUseCase = makeFetchUserRatingHistory()

  const { rates } = await fetchUserRatingHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ rates })
}
