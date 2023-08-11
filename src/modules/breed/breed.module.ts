import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedEntity } from './breed.entity';
import { BreedMiddleware } from './breed.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([BreedEntity])],
    controllers: [BreedController],
    providers: [BreedService],
})
export class BreedModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BreedMiddleware)
            .forRoutes({ path: 'breed', method: RequestMethod.POST });
    }
}
