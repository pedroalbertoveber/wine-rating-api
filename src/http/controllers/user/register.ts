import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '../../../use-cases/factories/make-register-user-use-case'
import { EmailAlreadyRegisteredError } from '../../../use-cases/errors/email-already-registered-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = createUserBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUserUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof EmailAlreadyRegisteredError) {
      return reply.status(403).send({ message: err.message })
    }
    throw err
  }
}
