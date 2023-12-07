import type { Controller, httpRequest } from '../../presentation/protocols'
import type { Request, Response } from 'express'
export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: httpRequest = {
            body: req.body
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statuscode).json(httpResponse.body)
    }
}
