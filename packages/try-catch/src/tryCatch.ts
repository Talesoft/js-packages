export default function tryCatch<Result, ErrorType = Error>(
  handler: () => Result,
): Result | ErrorType
export default function tryCatch<Result, ErrorResult = Result, ErrorType = Error>(
  handler: () => Result,
  errorHandler: (error: ErrorType) => ErrorResult,
): Result | ErrorResult
export default function tryCatch<Result, ErrorResult = Result, ErrorType = Error>(
  handler: () => Result,
  errorHandler?: (error: ErrorType) => ErrorResult,
): Result | ErrorResult | ErrorType {
  'hide source'
  try {
    return handler()
  } catch (error) {
    return errorHandler === undefined ? error : errorHandler(error)
  }
}
