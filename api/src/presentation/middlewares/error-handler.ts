import { Request, Response } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log('error at', req.path)
  console.error('error:', err)
}
