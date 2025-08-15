import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      try {
        const status = exception.getStatus();
        const response = exception.getResponse();
        this.logger.warn(
          `HttpException ${status}: ${typeof response === 'string' ? response : JSON.stringify(response)}`,
        );
      } catch {
        this.logger.warn(`HttpException thrown`);
      }
    } else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
    } else {
      try {
        this.logger.error(`Unknown exception: ${JSON.stringify(exception)}`);
      } catch {
        this.logger.error(`Unknown non-serializable exception`);
      }
    }

    // Delegate back to Nest's default handling
    super.catch(exception, host);
  }
}
