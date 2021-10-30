import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/users";
import * as bcrypt from "bcrypt"
import { posts } from "src/models/posts";


@Injectable()

export class user_service {
    constructor(@InjectModel(User) private users: typeof User){}

    async findAll() {
        return await this.users.findAll();
    }

    async findOne(param) {
        return await this.users.findOne({where : {
            id : param.id
        }});
    }

    async findUserWithPosts() {
        return await this.users.findAll({include : [{model : posts , as : "posts_user"}] , where : {
            id  : 48
        }});
    }


    async update(id , body) {
        if(body.password2) {
            body.password = bcrypt.hash(body.password2 , 10)
        } else {
            body.password = body.password
        }
        
        this.users.update(body , {where : {
            id : id
        }})

    }

    async delete(param) {
        return await this.users.destroy({where : {
            id : param.id
        }})
    }
}