import { IsString, Length } from "class-validator";


export class post_validate {
    @Length(0, 150 , {message : "البوست كبير جدا"})
    @IsString({message : "البوست يجب ان يكون نص"})
    post : string

    user : number

    photo : string

    isActive : boolean

}