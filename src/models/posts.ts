import {  BelongsTo, BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { comments } from './comments';
import { User } from './users';

@Table
export class posts extends Model {


    @Column({defaultValue : null})
    post : string

    @Column
    user : number

    @Column({defaultValue : null})
    photo: string;

    @Column({ defaultValue: false })
    isActive: boolean;

    @BelongsTo(() => User , "user")
    user_posts : User[]

    @HasMany(() => comments , "posts")
    comments_posts : comments[]
}
