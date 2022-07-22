import { StatusCodes } from 'http-status-codes'

export class ErrorCode {
  public static readonly UnauthenticatedError = "Vous n'êtes pas authentifié.e"
  public static readonly UnauthorizeError = "Vous n'avez pas assez de droit pour accéder à cette ressource"
  public static readonly MissingTokenError = 'Veuillez passer un token pour accéder à cette ressource'
  public static readonly ExpiredTokenError = "Le token n'est plus valable"
  public static readonly ValidationError = "Vous n'avez pas envoyé la bonne structure"
  public static readonly NotFound = 'Impossible de trouver la ressource demandée'
  public static readonly DuplicateEntityError = 'Une entité unique de ce type existe deja'
  public static readonly AsyncError = 'Une erreur asynchrone vient de se produire'
  public static readonly UnknownError = 'Une erreur inconnue vient de se produire'
}
export const ErrorCodeStatus: Map<ErrorCode, StatusCodes> = new Map([
  [ErrorCode.UnauthenticatedError, StatusCodes.UNAUTHORIZED],
  [ErrorCode.UnauthorizeError, StatusCodes.UNAUTHORIZED],
  [ErrorCode.MissingTokenError, StatusCodes.UNAUTHORIZED],
  [ErrorCode.ExpiredTokenError, StatusCodes.UNAUTHORIZED],
  [ErrorCode.ValidationError, StatusCodes.BAD_REQUEST],
  [ErrorCode.NotFound, StatusCodes.NOT_FOUND],
  [ErrorCode.AsyncError, StatusCodes.BAD_REQUEST],
  [ErrorCode.DuplicateEntityError, StatusCodes.CONFLICT],
  [ErrorCode.UnknownError, StatusCodes.INTERNAL_SERVER_ERROR]
])
