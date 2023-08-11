import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { EstablishmentMiddleware } from './establishment.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from './establishment.entity';
import { AddressEntity } from '../address/address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EstablishmentEntity, AddressEntity])],
    controllers: [EstablishmentController],
    providers: [EstablishmentService],
})
export class EstablishmentModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(EstablishmentMiddleware)
            .forRoutes({ path: 'establishment', method: RequestMethod.POST });
    }
}
