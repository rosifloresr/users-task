import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
    constructor( @InjectRepository(Task) private TaskRepository: Repository<Task>){}

    findAll(){
        return this.TaskRepository.find({relations: ['user']});
    }

    create(title: string, user:User){
        const task = this.TaskRepository.create({title, user});
        return this.TaskRepository.save(task);
    }
}
