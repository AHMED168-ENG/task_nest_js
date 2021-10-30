import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailModule } from "src/mail/mail.module";
import { MailService } from "src/mail/mail.service";
import { User } from "src/models/users";
import { auth_controller } from "./controller/auth_controller";
import { auth_service } from "./service/auth_service";

@Module({
    imports : [
        SequelizeModule.forFeature([
            User
        ]),
        MailModule
    ],
    controllers : [
        auth_controller
    ],
    providers : [
        auth_service,
    ]
})


export class auth_module{}