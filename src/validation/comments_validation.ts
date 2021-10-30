import { IsNotEmpty, IsString, Length } from "class-validator";


export class comment_validation {
    @IsNotEmpty({message : "يجب ادخال الكومنت"})
    @Length(0 ,150,{message : "الكومنت كبير جدا"})
    @IsString({message : "يجب ان يكون الكومنت نص"})
    comments : string
}