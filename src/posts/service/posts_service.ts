import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { posts } from "src/models/posts";
import { User } from "src/models/users";



@Injectable()

export class PostsService {

    constructor (@InjectModel(posts) private Posts : typeof posts){}


    findAll() {
        return this.Posts.findAll()
    }
    create(body) {
        return this.Posts.create(body)
    }
    findOne(id) {
        return this.Posts.findOne({where : {
            id : id
        }})
    }
    deleteOne(id) {
        return this.Posts.destroy({where : {
            id : id
        }})
    }
    updateOne(id , body) {
        return this.Posts.update(body , {where : {
            id : id
        }})
    }
    findUserPosts(id) {
        return this.Posts.findOne({include : [{model : User , as : "user_posts" , attributes : ["id" , "userName" , "photo"] }] , where : {
            id : id
        } })
    }
    findAllUserPosts() {
        return this.Posts.findAll({include : [{model : User , as : "user_posts" , attributes : ["id" , "userName" , "photo"]}]})
    }
}