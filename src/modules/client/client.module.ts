import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientMiddleware } from './client.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { RoleEntity } from '../role/role.entity';
import { AddressEntity } from '../address/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity, RoleEntity, AddressEntity]),
    ],
    providers: [ClientService],
    controllers: [ClientController],
})
export class ClientModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ClientMiddleware)
            .forRoutes({ path: 'client', method: RequestMethod.POST });
    }
}
