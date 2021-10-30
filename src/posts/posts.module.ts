import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { posts } from 'src/models/posts';
import { PostsController } from './controller/posts_controller';
import { PostsService } from './service/posts_service';

@Module({
    imports : [
        SequelizeModule.forFeature([
            posts
        ])
    ],
    controllers : [
        PostsController
    ],
    providers  : [
        PostsService
    ]
})
export class PostsModule {}
