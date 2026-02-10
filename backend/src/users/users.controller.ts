import {Controller, Post, Body, Get} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() dto: CreateUserDto){
        return this.usersService.create(dto);
    }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }
}