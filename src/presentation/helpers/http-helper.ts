import type { httpResponse } from '../protocols/http'
export const badRequest = (error: Error): httpResponse => {
    return {
      statuscode: 400,
      body: error
    }
}
