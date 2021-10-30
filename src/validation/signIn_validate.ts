import { IsEmail, IsNotEmpty,IsString, Length } from 'class-validator';

export class signIn_validate {
    @IsNotEmpty({message : "يجب عليك ادخال الايميل"})
    @IsString({message : "الايميل يجب ان يحتوي علي حروف"})
    @IsEmail({}, {message : "هذا الحقل يجب ان يكون ايميل"})
    email: string;

    @IsNotEmpty({message : "يجب عليك ادخال الرقم السري"})
    @IsString({message : "الرقم السري يجب ان يحتوي علي حروف"})
    @Length(10 , 20 , {message : "الرقم السري لايجب ان يزيد عن 20 او يقل عن 10"}) 
    password: string;
}