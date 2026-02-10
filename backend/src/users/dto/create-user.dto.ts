import { IsString, minLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    password: string;
}