import { getSolutionToExport } from 'owasp-shared/export-solution.js'
import { request } from 'undici'
import solution from './solution.js'

async function profile(fastify) {
  fastify.get(
    '/profile',
    {
      onRequest: [fastify.authenticate]
    },
    async req => {
      req.log.info(req.user)
      console.log(req.user)
      console.log(req.headers)
      const { body } = await request('http://localhost:3001', {
        method: 'GET',
        headers: {
          'content-type': req.headers['content-type']
        }
      })
      return body
    }
  )
}

export default getSolutionToExport(profile, solution)
