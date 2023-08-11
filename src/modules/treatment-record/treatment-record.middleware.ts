import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { TreatmentRecordSchema } from './treatment-record.schema';

export class TreatmentRecordMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await TreatmentRecordSchema.validate(req.body, {
                abortEarly: false,
            });
            next();
        } catch (error) {
            next(error);
        }
    }
}
