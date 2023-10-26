import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ProcedurePostSchema } from './procedure.schema';

export class ProcedureMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await ProcedurePostSchema.validate(req.body, {
                abortEarly: false,
            });
            next();
        } catch (error) {
            next(error);
        }
    }
}
