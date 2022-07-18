import { StatusCodes } from 'http-status-codes'

export class ErrorCode {
  public static readonly Unauthenticated = "Vous n'êtes pas authentifié.e"
  public static readonly ValidationError = "Vous n'avez pas envoyé la bonne structure"
  public static readonly NotFound = 'Impossible de trouver la ressource demandée'
  public static readonly DuplicateEntityError = 'Une entité unique de ce type existe deja'
  public static readonly AsyncError = 'Une erreur asynchrone vient de se produire'
  public static readonly UnknownError = 'Une erreur inconnue vient de se produire'
}
export const ErrorCodeStatus: Map<ErrorCode, StatusCodes> = new Map([
  [ErrorCode.Unauthenticated, StatusCodes.UNAUTHORIZED],
  [ErrorCode.ValidationError, StatusCodes.BAD_REQUEST],
  [ErrorCode.NotFound, StatusCodes.NOT_FOUND],
  [ErrorCode.AsyncError, StatusCodes.BAD_REQUEST],
  [ErrorCode.DuplicateEntityError, StatusCodes.CONFLICT],
  [ErrorCode.UnknownError, StatusCodes.INTERNAL_SERVER_ERROR]
])
