import solution from './solution.js'
import { getSolutionToExport } from 'owasp-shared/export-solution.js'

async function ecommerce(fastify) {
  const config = {
    rateLimit: {
      max: 2,
      timeWindow: '1 minute'
    }
  }
  fastify.post('/buy-product', { config }, (req, reply) => {
    reply.send({ success: true })
  })
}

// Note: This helper just helps with internal unit testing
export default getSolutionToExport(ecommerce, solution)
