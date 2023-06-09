import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'

import { ZodError } from 'zod'
import { env } from './env'

import { usersRoutes } from './http/controllers/user/routes'
import { wineRoutes } from './http/controllers/wine/routes'
import { ratingRoutes } from './http/controllers/rate/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(wineRoutes)
app.register(ratingRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Todo: Here we should log to an external tool like Datadog/NewRelic/Sentry...
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
