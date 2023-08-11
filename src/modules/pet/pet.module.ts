import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { BreedEntity } from '../breed/breed.entity';
import { PetMiddleware } from './pet.middleware';
import { ClientEntity } from '../client/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PetEntity, BreedEntity, ClientEntity])],
    providers: [PetService],
    controllers: [PetController],
})
export class PetModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(PetMiddleware)
            .forRoutes({ path: 'pet', method: RequestMethod.POST });
    }
}
