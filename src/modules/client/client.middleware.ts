import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ClientSchema } from './client.schema';

export class ClientMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await ClientSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
