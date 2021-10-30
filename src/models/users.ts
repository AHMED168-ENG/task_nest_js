import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { comments } from './comments';
import { posts } from './posts';

@Table
export class User extends Model {
    @Column({unique : true })
    email : string

    @Column
    password : string

    @Column
    userName: string;

    @Column
    lastName: string;

    @Column({defaultValue : null})
    addres : string
    
    @Column
    age : number

    @Column 
    photo : string

    @Column({ defaultValue: false })
    isActive: boolean;

    @Column({defaultValue : false})
    isAdmin : boolean

    @HasMany(() => posts , "user")
    posts_user : posts[] 

    @HasMany(() => comments , "user")
    comments_user : comments[] 

}
