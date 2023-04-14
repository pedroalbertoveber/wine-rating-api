import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateWineUseCase } from '../../../use-cases/factories/make-create-wine-use-case'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createWineBodySchema = z.object({
    name: z.string(),
    country: z.string(),
    type: z.string(),
  })

  const { name, type, country } = createWineBodySchema.parse(request.body)

  const createWineUseCase = makeCreateWineUseCase()

  await createWineUseCase.execute({
    name,
    type,
    country,
  })

  return reply.status(201).send()
}
