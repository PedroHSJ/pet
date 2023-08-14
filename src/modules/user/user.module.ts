import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMiddleware } from './user.middleware';
import { RoleEntity } from '../role/role.entity';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddleware).forRoutes({
            path: '/user',
            method: RequestMethod.POST,
        });
    }
}
