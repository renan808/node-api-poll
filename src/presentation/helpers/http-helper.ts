import { ServerError } from '../errors/Server-error'
import type { httpResponse } from '../protocols/http'
export const badRequest = (error: Error): httpResponse => ({
  statuscode: 400,
  body: error
})

export const serverError = (): httpResponse => ({
  statuscode: 500,
  body: new ServerError()
})

export const ok = (data: any): httpResponse => ({
  statuscode: 200,
  body: data
})
