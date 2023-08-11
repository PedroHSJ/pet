import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressMiddleware } from './address.middleware';
import { AddressEntity } from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([AddressEntity])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AddressMiddleware)
            .forRoutes({ path: 'address', method: RequestMethod.POST });
    }
}
