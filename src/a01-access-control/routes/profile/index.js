import errors from 'http-errors'
import SQL from '@nearform/sql'
import solution from './solution.js'
import { getSolutionToExport } from 'owasp-shared/export-solution.js'

function profile(fastify) {
  fastify.get(
    '/profile',
    {
      onRequest: [fastify.authenticate]
    },
    async req => {
      const { username } = req.user
      if (!req.user) {
        throw new errors.Unauthorized()
      }

      if (username !== req.query.username) {
        throw new errors.Forbidden()
      }

      const {
        rows: [user]
      } = await fastify.pg.query(
        SQL`SELECT id, username, age FROM users WHERE username = ${username}`
      )

      if (!user) {
        throw new errors.NotFound()
      }
      return user
    }
  )
}

// Note: This helper just helps with internal unit testing
export default getSolutionToExport(profile, solution)
