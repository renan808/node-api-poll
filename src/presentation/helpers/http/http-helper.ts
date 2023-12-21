import { ServerError } from '../../errors'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import type { httpResponse } from '../../protocols'
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

export const unauthorized = (): httpResponse => ({
  statuscode: 401,
  body: new UnauthorizedError()
})
