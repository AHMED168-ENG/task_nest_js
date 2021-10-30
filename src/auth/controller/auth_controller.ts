import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { helper_functions } from "src/helper_functions/helper";
import { signIn_validate } from "src/validation/signIn_validate";
import { auth_service } from "../service/auth_service";
import { diskStorage } from "multer";
import { extname } from "path";
import { signUp_validate } from "src/validation/signUp.request";

@Controller("auth")
export class auth_controller {
    constructor (
        private readonly authServic : auth_service){}
    @Post("signUp") 
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
    signUp(@Body() body : signUp_validate , @UploadedFile() photo ) {
        body.photo = __dirname.slice(0 , __dirname.indexOf("dist")) + photo.path;
       return this.authServic.signUp(body)
    }

    @Post("signIn") 
    signIn(@Body() body : signIn_validate , @Res() res , @Req() req ) {
        return this.authServic.signIn(body , req , res)
    }
}


