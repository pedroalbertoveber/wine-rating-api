import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdateWineUseCase } from '../../../use-cases/factories/make-update-wine-use-case'

export async function updateWine(request: FastifyRequest, reply: FastifyReply) {
  const updateWineBodySchema = z.object({
    name: z.string(),
    country: z.string(),
    type: z.string(),
  })

  const updateWineQuerySchema = z.object({
    id: z.string(),
  })

  const { country, name, type } = updateWineBodySchema.parse(request.body)
  const { id } = updateWineQuerySchema.parse(request.query)

  try {
    const updateWineUseCase = makeUpdateWineUseCase()

    await updateWineUseCase.execute({
      id,
      country,
      name,
      type,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
