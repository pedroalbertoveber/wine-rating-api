import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchAllWinesUseaCase } from '../../../use-cases/factories/make-fetch-all-wines-use-case'
import { z } from 'zod'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllWinesQuerySchama = z.object({
    page: z.coerce.number().nullable(),
  })

  const { page } = fetchAllWinesQuerySchama.parse(request.query)

  console.log(page)

  const fetchWinesUseCase = makeFetchAllWinesUseaCase()

  const { wines } = await fetchWinesUseCase.execute({
    page: page ?? 1,
  })

  return reply.status(200).send({
    wines,
  })
}
