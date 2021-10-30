import {HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/users";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { MailService } from "src/mail/mail.service";

@Injectable()
export class auth_service  {
    constructor(@InjectModel(User) 
    private users : typeof User ,
    private readonly mailservice : MailService
    ){}

    async signUp(body) {
        var user = await this.users.findOne({where : {
            email : body.email
        }})
        if (user) {
            throw new HttpException("هذا الايميل موجود بالطبع", HttpStatus.UNAUTHORIZED);
        }
        var password = await bcrypt.hash(body.password , 10);
        body.password = password
        await this.mailservice.sendMail(body , "http://localhost:5000/user/all" , "اهلا بك في تويتر يمكنك تقعيل الحساب من هنا");
        
        return this.users.create(body);
    }

    async signIn(body , req , res) {
        var user = await this.users.findOne({where : {
            email : body.email,
        }});
        if(! await user) {
            await res.send( {message : "هذا الايميل غير موجود" , type : "error"})
            return
        }
        var passward = await bcrypt.compare(body.password , user.password)
        if(! await passward) {
            await res.send( {message : "الرقم السري غير صحيح", type : "error"})
            return
        }
        var expired = await body.expired ? {expiresIn : process.env.EXPIREDIN} : {}
        var user_id = user.id
        var tocken = await jwt.sign({id : user.id , user : user} , process.env.SECRET_KEY , expired)
        res.send( {tocken : tocken, type : "success" , id : user_id})
    }

}