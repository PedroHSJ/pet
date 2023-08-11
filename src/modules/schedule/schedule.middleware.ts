import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ScheduleSchema } from './schedule.schema';

export class ScheduleMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: NextFunction) {
        try {
            await ScheduleSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
