import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { signUp_validate } from "src/validation/signUp.request";
import { user_service } from "../services/user_services";


@Controller("user")
export class user_controller {

    constructor (private readonly User_service : user_service){}

    @Get("all") 
    findAll() {
        return this.User_service.findAll()
    } 

    @Get("find/:id") 
    findOne(@Param() param) {
        return this.User_service.findOne(param)
    } 

    @Get("userPosts") 
    findUserWithPosts() {
        return this.User_service.findUserWithPosts()
    } 
    
    @Post("update/:id")
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
    update(@Body() body : signUp_validate, @Param() Param , @UploadedFile() photo) {
        body.photo = __dirname.slice(0 , __dirname.indexOf("dist")) + photo.path;
        return this.User_service.update(Param.id , body)
    } 

    @Get("delete/:id") 
    delete(@Param() Param) {
        return this.User_service.delete(Param)
    } 
}