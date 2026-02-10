import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>, ) {}

    create(dto: CreateUserDto){
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    findByUsername(username: string){
        return this.userRepository.findOne({where: {username}});
    }

    findAll(){
        return this.userRepository.find({relations: ['tasks']});
    }

}