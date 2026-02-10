import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(username: string, password: string){
        const user = await this.usersService.findByUsername(username);

        if (!user || user.password != password){
            throw new UnauthorizedException();
        }

        return {
            access_token: this.jwtService.sign({id: user.id, username: username}),
        };
    }
}
