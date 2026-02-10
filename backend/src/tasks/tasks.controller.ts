import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {JwtAuthGuard} from '../auth/jwt.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor (private tasksService: TasksService) {}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body() dto: CreateTaskDto, @Req() req: any){
        return this.tasksService.create(dto.title, req.user);
    }
}
