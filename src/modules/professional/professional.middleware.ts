import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
    ProfessinalPostSchema,
    ProfessinalPutSchema,
} from './professional.schema';

export class ProfessionalMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            //verificando se é um put ou post
            if (req.method === 'POST') {
                await ProfessinalPostSchema.validate(req.body, {
                    abortEarly: false,
                });
                next();
            }
            if (req.method === 'PUT') {
                console.log(req.body);
                await ProfessinalPutSchema.validate(req.body, {
                    abortEarly: false,
                });
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}
