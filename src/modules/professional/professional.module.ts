import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { ProfessionalMiddleware } from './professional.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from './professional.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProfessionalEntity, RoleEntity])],
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
})
export class ProfessionalModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ProfessionalMiddleware)
            .forRoutes({ path: 'professional', method: RequestMethod.POST })
            .apply(ProfessionalMiddleware)
            .forRoutes({ path: 'professional/:id', method: RequestMethod.PUT });
    }
}
