import { getSolutionToExport } from 'owasp-shared/export-solution.js'
import solution from './solution.js'
import axios from 'axios'
import errors from 'http-errors'
import SQL from '@nearform/sql'

function profilePicture(fastify) {
  fastify.post(
    '/user/image',
    {
      onRequest: [fastify.authenticate]
    },
    async req => {
      const imgUrl = req.body.imgUrl

      const domain = // eslint-disable-next-line
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim.exec(
          imgUrl
        )[1]

      console.log(domain)
      const hostDomain = validateUrl(imgUrl)
      const {
        rows: [checkDomain]
      } = await fastify.pg.query(
        SQL`SELECT * FROM allowedImageDomain WHERE hostname = ${hostDomain.hostname}`
      )

      if (!checkDomain) throw errors.Forbidden()

      const { data, status } = await axios.get(imgUrl)
      if (status !== 200) throw errors.BadRequest()
      return data
    }
  )
}

function validateUrl(imgUrl) {
  //use to get host name
  try {
    return new URL(imgUrl)
  } catch (error) {
    throw errors.BadRequest()
  }
}

export default getSolutionToExport(profilePicture, solution)
