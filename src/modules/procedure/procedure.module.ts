import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { ProcedureMiddleware } from './procedure.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureEntity } from './procedure.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProcedureEntity])],
    controllers: [ProcedureController],
    providers: [ProcedureService],
})
export class ProcedureModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ProcedureMiddleware)
            .forRoutes({ path: 'procedure', method: RequestMethod.POST });
    }
}
