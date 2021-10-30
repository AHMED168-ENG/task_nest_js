import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users';

@Injectable()
export class MailService {

    constructor (private mailserver : MailerService){}

    async sendMail(user : User , url : string , message : string) {

        await this.mailserver.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation',
            context: {
              firstName: user.userName,
              lastName: user.lastName,
              url,
              message
            },

        })
    }
}
