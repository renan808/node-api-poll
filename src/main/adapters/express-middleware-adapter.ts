import type { Middleware, httpRequest } from '@/presentation/protocols'
import type { NextFunction, Request, Response } from 'express'
export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: httpRequest = {
            headers: req.headers
        }
        const httpResponse = await middleware.handle(httpRequest)
        if (httpResponse.statuscode !== 200) {
            res.status(httpResponse.statuscode).json({
                error: httpResponse.body.message
            })
        } else {
            Object.assign(req, httpResponse.body)
            next()
        }
    }
}
