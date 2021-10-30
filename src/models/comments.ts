import {  BelongsTo, BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { posts } from './posts';
import { User } from './users';

@Table
export class comments extends Model {


    @Column
    comments : string

    @Column
    user : number

    @Column
    posts : number

    @Column({ defaultValue: true })
    isActive: boolean;

    @BelongsTo(() => User , "user")
    user_comments : User[]

    @BelongsTo(() => posts , "post")
    posts_comment : posts[]
}
