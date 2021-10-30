import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { auth_module } from './auth/auth_module';
import { auth_controller } from './auth/controller/auth_controller';
import { auth_service } from './auth/service/auth_service';
import { User } from './models/users';
import { user_controller } from './users/controller/user_controller';
import { user_service } from './users/services/user_services';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { MulterModule } from '@nestjs/platform-express';
import { helper_functions } from './helper_functions/helper';
import { posts } from './models/posts';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { comments_controller } from './comments/controller/comments.controller';
import { comment_service } from './comments/services/comments.services';
import { comments } from './models/comments';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    SequelizeModule.forFeature([
      User,
      posts,
      comments
    ]),
    MulterModule.register({
      dest : "./public/frontEnd",
    }),
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect : "postgres",
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'twitter_full_stack',
      synchronize : true,
      autoLoadModels: true
    }),
    UsersModule,
    auth_module,
    MailModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [
    AppController ,
    user_controller , 
    auth_controller,
    comments_controller
  ],
  providers: [
    AppService , 
    user_service , 
    auth_service, 
    MailService , 
    helper_functions,
    comment_service
  ],
})
export class AppModule {}
