import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { EstablishmentSchema } from './establishment.schema';

export class EstablishmentMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await EstablishmentSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
