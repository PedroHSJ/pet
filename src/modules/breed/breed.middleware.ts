import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { BreedSchema } from './breed.schema';

export class BreedMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await BreedSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
