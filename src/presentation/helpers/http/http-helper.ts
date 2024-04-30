import { ServerError } from "../../errors/server-error"
import { UnauthorizedError } from '../../errors/unauthorized-error'
import type { httpResponse } from '../../protocols'
export const badRequest = (error: Error): httpResponse => ({
  statuscode: 400,
  body: error.message
})

export const serverError = (error: Error): httpResponse => ({
  statuscode: 500,
  body: new ServerError(error.message ?? error.stack)
})

export const ok = (data: any): httpResponse => ({
  statuscode: 200,
  body: data
})
export const noContent = (): httpResponse => ({
  statuscode: 204,
  body: null
})

export const unauthorized = (): httpResponse => ({
  statuscode: 401,
  body: {
    error: new UnauthorizedError()

  }
})

export const forbidden = (error: Error): httpResponse => ({
  statuscode: 403,
  body: error
})
