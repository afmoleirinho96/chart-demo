import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class CoinGeckoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = exception?.response?.data?.status?.error_code || HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception?.response?.statusText || "Internal server error";
    let reason =
      exception?.response?.data?.status?.error_message ||
      "Unfortunately, we could not discover the root cause of the error. Please try again later.";

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : (exceptionResponse as any).message || "Internal server error";
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      reason
    });
  }
}
