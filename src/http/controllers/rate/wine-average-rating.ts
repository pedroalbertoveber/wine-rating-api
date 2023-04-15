import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetWineAverageRatingUseCase } from '../../../use-cases/factories/make-get-wine-average-rating-use-case'

export async function getWineAverageRating(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getWineAverageRatingQuerySchema = z.object({
    wineId: z.string(),
  })

  const { wineId } = getWineAverageRatingQuerySchema.parse(request.query)

  const getWineAverageRatingUseCase = makeGetWineAverageRatingUseCase()

  const { wineAverageRating } = await getWineAverageRatingUseCase.execute({
    wineId,
  })

  return reply.status(200).send({ wineAverageRating })
}
