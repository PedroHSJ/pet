import { Module, RequestMethod } from '@nestjs/common';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecieEntity } from './specie.entity';
import { PetClassEntity } from '../pet-class/pet-class.entity';
import { SpecieMiddleware } from './specie.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([SpecieEntity, PetClassEntity])],
    controllers: [SpecieController],
    providers: [SpecieService],
})
export class SpecieModule {
    configure(consumer) {
        consumer
            .apply(SpecieMiddleware)
            .forRoutes({ path: 'specie', method: RequestMethod.POST });
    }
}
