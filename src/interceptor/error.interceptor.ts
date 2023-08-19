import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import * as Yup from 'yup';
@Catch()
export class ErrorInterceptor implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse() as string;
        }

        if (exception instanceof Yup.ValidationError) {
            const errors: any = {};
            exception.inner.forEach((err: any) => {
                errors[err.path] = err.errors;
            });

            return response
                .status(400)
                .json({ message: 'Erro de validação.', errors });
        }
        if (exception instanceof QueryFailedError) {
            const erro = new BadRequestException(exception.message);
            status = erro.getStatus();
            message = erro.getResponse() as string;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
