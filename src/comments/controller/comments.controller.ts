import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { comment_validation } from "src/validation/comments_validation";
import { comment_service } from "../services/comments.services";


@Controller("comments") 
export class comments_controller {
    constructor (readonly comment_service : comment_service){}

    @Post("create")
    ceate(@Body() body : comment_validation) {
        return this.comment_service.create(body)
    }

    @Get("findOne/:id")
    findOne(@Param() param) {
        return this.comment_service.findOne(param.id)
    }
    @Get("findAll")
    findAll() {
        return this.comment_service.findAll()
    }
    @Post("updateOne/:id")
    updateOne(@Body() body : comment_validation , @Param() param) {
        return this.comment_service.updateOne(param.id,body)
    }
    @Get("deleteOne/:id")
    deleteOne(@Param() param) {
        return this.comment_service.deleteOne(param.id)
    }

    @Get("findCommentUserPosts")
    findCommentUserPosts() {
        return this.comment_service.findCommentUserPosts()
    }

}