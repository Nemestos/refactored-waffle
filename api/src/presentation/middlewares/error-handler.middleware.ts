import { NextFunction, Request, Response } from 'express'
import { ErrorException } from '~/domain/errors/error-exception'
import { ErrorModel } from '~/domain/errors/error-model'
import { logger } from '~/utils/logger'
import { StatusCodes } from 'http-status-codes'
import { ErrorCode } from '~/domain/errors/error-code'
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.info('Error handling middleware was throwed')
  logger.info('Path:', req.path)
  logger.error('Error:', err)

  if (err instanceof ErrorException) {
    res.status(err.status).send(err)
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ code: ErrorCode.UnknownError, status: StatusCodes.INTERNAL_SERVER_ERROR } as ErrorModel)
  }
}
