import { StatusCodes } from 'http-status-codes'

export class ErrorCode {
  public static readonly Unauthenticated = "Vous n'êtes pas authentifié.e"
  public static readonly NotFound = 'Impossible de trouver la ressource demandée'
  public static readonly AsyncError = 'Une erreur asynchrone vient de se produire'
  public static readonly UnknownError = 'Une erreur inconnue vient de se produire'
}
export const ErrorCodeStatus: Map<ErrorCode, StatusCodes> = new Map([
  [ErrorCode.Unauthenticated, StatusCodes.UNAUTHORIZED],
  [ErrorCode.NotFound, StatusCodes.NOT_FOUND],
  [ErrorCode.AsyncError, StatusCodes.BAD_REQUEST],
  [ErrorCode.UnknownError, StatusCodes.INTERNAL_SERVER_ERROR]
])
