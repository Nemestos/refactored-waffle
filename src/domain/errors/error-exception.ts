import { ErrorCode, ErrorCodeStatus } from './error-code'

export class ErrorException extends Error {
  public status: number
  public metaData: any

  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code)
    this.name = code
    this.status = ErrorCodeStatus.get(code) as number
    this.metaData = metaData
  }
}
