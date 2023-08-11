import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PetSchema } from './pet.schema';

export class PetMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await PetSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
