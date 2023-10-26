import { Module } from '@nestjs/common';
import { PetClassService } from './pet-class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetClassEntity } from './pet-class.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PetClassEntity])],
    providers: [PetClassService],
})
export class PetClassModule {}
