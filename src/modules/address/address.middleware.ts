import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AddressSchema } from './address.schema';

export class AddressMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await AddressSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
