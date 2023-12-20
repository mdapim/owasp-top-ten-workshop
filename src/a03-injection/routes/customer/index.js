import solution from './solution.js'
import { getSolutionToExport } from 'owasp-shared/export-solution.js'
import errors from 'http-errors'
import SQL from '@nearform/sql'

async function customer(fastify) {
  fastify.get(
    '/customer',
    {
      onRequest: [fastify.authenticate]
    },
    async req => {
      const { name } = req.query
      const sql = SQL`SELECT * FROM customers WHERE name=${name}`
      const { rows: customers } = await fastify.pg.query(sql)
      if (!customers.length) throw errors.NotFound()
      return customers
    }
  )
}

// Note: This helper just helps with internal unit testing
export default getSolutionToExport(customer, solution)
