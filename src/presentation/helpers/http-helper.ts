import { ServerError } from '../errors'
import type { httpResponse } from '../protocols'
export const badRequest = (error: Error): httpResponse => ({
  statuscode: 400,
  body: error
})

export const serverError = (error: Error): httpResponse => ({
  statuscode: 500,
  body: new ServerError(error.stack ?? error.message)
})

export const ok = (data: any): httpResponse => ({
  statuscode: 200,
  body: data
})
