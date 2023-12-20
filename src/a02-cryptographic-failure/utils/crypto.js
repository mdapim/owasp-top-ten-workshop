// import md5 from 'md5'
import { getSolutionToExport } from 'owasp-shared/export-solution.js'
import * as solution from './solution.js'
import bcrypt from 'bcrypt'

let hashPassword = async function hashPassword(password) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

let comparePassword = async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

// Note: This helper just helps with internal unit testing
hashPassword = getSolutionToExport(hashPassword, solution.hashPassword)
comparePassword = getSolutionToExport(comparePassword, solution.comparePassword)

export { hashPassword, comparePassword }
