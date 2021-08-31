export type TryCatchFunction = {
  <Result, ErrorType = unknown>(handler: () => Result): Result | ErrorType
  <Result, ErrorResult = Result, ErrorType = unknown>(
    handler: () => Result,
    errorHandler: (error: ErrorType) => ErrorResult,
  ): Result | ErrorResult
}

const tryCatch: TryCatchFunction = <Result, ErrorResult = Result, ErrorType = unknown>(
  handler: () => Result,
  errorHandler?: (error: ErrorType) => ErrorResult,
): Result | ErrorResult | ErrorType => {
  'hide source'
  try {
    return handler()
  } catch (error) {
    return errorHandler === undefined ? (error as ErrorType) : errorHandler(error as ErrorType)
  }
}
export default tryCatch
