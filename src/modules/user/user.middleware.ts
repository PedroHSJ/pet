import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserSchema } from './user.schema';

export class UserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            await UserSchema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            next(error);
        }
    }
}
