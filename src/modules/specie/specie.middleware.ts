import { NestMiddleware } from '@nestjs/common';
import { SpecieSchema } from './specie.schema';
import { NextFunction } from 'express';

export class SpecieMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await SpecieSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
