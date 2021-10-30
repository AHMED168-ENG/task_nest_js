import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IsAuthonticat } from 'src/middleWare/Is_authonticat';
import { User } from 'src/models/users';
import { user_controller } from './controller/user_controller';
import { user_service } from './services/user_services';

@Module({
    imports : [
        SequelizeModule.forFeature([
            User
        ]),
    ] , 
    controllers : [
        user_controller
    ],
    providers : [
        user_service
    ],
})
export class UsersModule implements NestModule  {
    configure(consumer : MiddlewareConsumer) {
        consumer.apply(IsAuthonticat).forRoutes(user_controller)
    }
}
