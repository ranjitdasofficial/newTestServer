import { IsEmail, IsNumber, IsString } from "class-validator";

export class TeacherDto {
    @IsString()
    name: string;
    @IsString()
    section:string;
    @IsString()
    subject:string;
}


export class ReviewDto {
    @IsNumber()
    rating: number;
    @IsString()
    teacherId:string;
    @IsString()
    comments:string;
    @IsString()
    commentedBy:string;
    @IsNumber()
    internalScore:number;



}


export class AddLinks{
    @IsString()
    name:string;

    @IsString()
    link:string;

    @IsString()
    createdBy:string;

}

export class FacultiesContactDto{
    @IsString()
    name:string;


    @IsString()
    phone:string;
}


export class UpdateDataDTO{
    @IsString()
    data:string;

    @IsString()
    id:string;
}

