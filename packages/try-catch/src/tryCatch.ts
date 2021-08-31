export type TryCatchFunction = {
  <Result, ErrorType = Error>(handler: () => Result): Result | ErrorType
  <Result, ErrorResult = Result, ErrorType = Error>(
    handler: () => Result,
    errorHandler: (error: ErrorType) => ErrorResult,
  ): Result | ErrorResult
}

const tryCatch: TryCatchFunction = <Result, ErrorResult = Result, ErrorType = Error>(
  handler: () => Result,
  errorHandler?: (error: ErrorType) => ErrorResult,
): Result | ErrorResult | ErrorType => {
  'hide source'
  try {
    return handler()
  } catch (error) {
    return errorHandler === undefined ? error : errorHandler(error)
  }
}
export default tryCatch
