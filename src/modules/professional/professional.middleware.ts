import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ProfessinalSchema } from './professional.schema';

export class ProfessionalMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await ProfessinalSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
