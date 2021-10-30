import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { comments } from 'src/models/comments';
import { comments_controller } from './controller/comments.controller';
import {comment_service } from './services/comments.services';

@Module({
    imports : [
        SequelizeModule.forFeature([
            comments
          ]),
    ],
    controllers : [
        comments_controller
    ],
    providers : [
        comment_service
    ]
})
export class CommentsModule {}
