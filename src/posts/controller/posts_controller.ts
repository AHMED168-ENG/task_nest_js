import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { post_validate } from "src/validation/create_post_validate";
import { PostsService } from "../service/posts_service";


@Controller("posts")
export class PostsController  {
    constructor (private readonly postsService : PostsService){}

    @Get("allPosts")
    findAll() {
        return this.postsService.findAll()
    }

    @Post("create")
    @UseInterceptors(
        FileInterceptor("photo" , {storage :  diskStorage({
            destination: "./public/frontEnd",
            filename: (req , file , done) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = extname(file.originalname);
                const randomName = Array(4)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                done(null, `${name}-${randomName}${fileExtName}`);
            },
            }),
            fileFilter: (req, file, done) => {
                if(!file) {
                    throw new Error("الصوره غير موجوده")
                    
                }
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return done(new Error('Only image files are allowed!'), false);
            }
            return done(null, true);
            }
        }) 
        )
    create(@Body() body : post_validate , @UploadedFile() photo) {
        return this.postsService.create(body)
    }

    @Post("update/:id")
    update(@Body() body : post_validate , @Param()  param) {
        return this.postsService.updateOne(param.id ,body)
    }

    @Get("findOne/:id")
    findOne(@Param()  param) {
        return this.postsService.findOne(param.id)
    }
    @Get("deleteOne/:id")
    deleteOne(@Param()  param) {
        return this.postsService.deleteOne(param.id)
    }


    @Get("findUserPosts/:id")
    findUserPosts(@Param() param) {
        return this.postsService.findUserPosts(param.id)
    }

    @Get("findAllUserPosts")
    findAllUserPosts() {
        return this.postsService.findAllUserPosts()
    }


}