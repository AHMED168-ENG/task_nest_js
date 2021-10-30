import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { comments } from "src/models/comments";
import { posts } from "src/models/posts";
import { User } from "src/models/users";



@Injectable() 

export class comment_service {
    constructor(@InjectModel(comments) private Comments : typeof comments){}

    create(body) {
        return this.Comments.create(body)
    }

    findAll() {
        return this.Comments.findAll()
    }

    findOne(id) {
        return this.Comments.findOne({where : {
            id : id
        }})
    }

    deleteOne(id) {
        return this.Comments.destroy({where : {
            id : id
        }})
    }
    updateOne(id , body) {
        return this.Comments.update(body ,{where : {
            id : id
        }})
    }

    findCommentUser() {
        return this.Comments.findAll({include : [{model : User , as : "user_comments"}]})
    }
    findCommentPosts() {
        return this.Comments.findAll({include : [{model : posts , as : "posts_comment"}]})
    }
    findCommentUserPosts() {
        return this.Comments.findAll({include : [{model : posts , as : "posts_comment"} , {model : User , as : "user_comments"}]})
    }
}