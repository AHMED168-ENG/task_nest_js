import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, MaxLength, Min, minLength, MinLength, MIN_LENGTH } from 'class-validator';

export class signUp_validate {
    @IsNotEmpty({message : "هذا الحقل الاسم الاول لايجب ان يكون فارغ"})
    @IsString({message : "هذا الاسم الاول الحقل يستقبل نصا فقط"})
    @Length(4 , 10 , {message : "هذا الاسم الاول الحقل لايجب ان يزيد عن 10 او يقل عن 4"})
    userName : string

    @IsNotEmpty({message : "هذا الحقل الاسم الاخير لايجب ان يكون فارغ"})
    @IsString({message : "هذا الاسم الاخير الحقل يستقبل نصا فقط"})
    @Length(4 , 10 , {message : "هذا الحقل الاسم الاخير لايجب ان يزيد عن 10 او يقل عن 4"})
    lastName : string

    @IsNotEmpty({message : "هذا الحقل الايميل لايجب ان يكون فارغ"})
    @IsString({message : "هذا الايميل الحقل يستقبل نصا فقط"})
    @IsEmail({}, {message : "هذا الحقل الايميل يجب ان يكون ايميل"})
    email: string;

    @IsNotEmpty({message : "هذا الحقل العنوان لايجب ان يكون فارغ"})
    @IsString({message : "هذا العنوان الحقل يستقبل نصا فقط"})
    addres: string;

    @IsNotEmpty({message : "هذا الحقل الرقم السري لايجب ان يكون فارغ"})
    @IsString({message : "هذا الحقل الرقم السري يستقبل نصا فقط"})
    password: string;

    isActive : boolean

    isAdmin : boolean

    @IsNotEmpty({message : "هذا العمر الحقل لايجب ان يكون فارغ"})
    age: number;
    asd: any;
    photo: any;

}