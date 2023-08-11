import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(auth: AuthDTO): Promise<{ token: string }> {
        const { email, password } = auth;
        if (!email || !password) {
            throw new BadRequestException('Missing email or password');
        }
        const userEntity = await this.userService.findByEmail(email);
        if (!userEntity) throw new BadRequestException('User not found');
        const isMatch = await compare(password, userEntity.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        if (process.env.SECRET == undefined)
            throw new BadRequestException('Secret not found');
        const token = await sign({ id: userEntity.id }, process.env.SECRET, {
            expiresIn: '7d',
        });
        return { token };
    }
}
