import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidWineRateError } from '../../../use-cases/errors/invalid-wine-rate-error'
import { makeCreateWineRateUseCase } from '../../../use-cases/factories/make-create-wine-rate-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createWineRateBodySchema = z.object({
    wineRate: z.coerce.number(),
    wine_id: z.string(),
  })

  const { wineRate, wine_id } = createWineRateBodySchema.parse(request.body)

  try {
    const createWineRateUseCase = makeCreateWineRateUseCase()

    await createWineRateUseCase.execute({
      wineRate,
      user_id: request.user.sub,
      wine_id,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof InvalidWineRateError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
