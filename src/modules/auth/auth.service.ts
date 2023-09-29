import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professional/professional.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly professionalService: ProfessionalService,
        private readonly clientService: ClientService,
    ) {}

    async login(auth: AuthDTO): Promise<{ token: string }> {
        switch (auth.scope) {
            case 'USER':
                return this.userLogin(auth);
            case 'PROFESSIONAL':
                return this.professionalLogin(auth);
            case 'CLIENT':
                return this.clientLogin(auth);
        }
    }

    async userLogin(auth: AuthDTO): Promise<{ token: string }> {
        const { email, password } = auth;
        if (!email || !password) {
            throw new BadRequestException('Email ou senha não informados.');
        }
        const userEntity = await this.userService.findByEmail(email);
        if (!userEntity)
            throw new BadRequestException('Usuário não encontrado');
        const isMatch = await compare(password, userEntity.password);
        if (!isMatch) throw new UnauthorizedException('Credeciais inválidas');
        if (process.env.SECRET == undefined)
            throw new BadRequestException('Chave secreta não encontrada');
        const token = sign({ id: userEntity.id }, process.env.SECRET, {
            expiresIn: '7d',
        });
        return { token };
    }

    async professionalLogin(auth: AuthDTO): Promise<{ token: string }> {
        const { email, password } = auth;
        if (!email || !password) {
            throw new BadRequestException('Email ou senha não informados.');
        }
        const professionalEntity = await this.professionalService.login(email);
        if (!professionalEntity)
            throw new BadRequestException('Profissional não encontrado');
        const isMatch = await compare(password, professionalEntity.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');
        if (process.env.SECRET == undefined)
            throw new BadRequestException('Chave secreta não encontrada');
        const token = sign({ id: professionalEntity.id }, process.env.SECRET, {
            expiresIn: '7d',
        });
        return { token };
    }

    async clientLogin(auth: AuthDTO): Promise<{ token: string }> {
        const { email, password } = auth;
        if (!email || !password) {
            throw new BadRequestException('Email ou senha não informados.');
        }
        const clientEntity = await this.clientService.login(email);
        if (!clientEntity)
            throw new BadRequestException('Cliente não encontrado');
        const isMatch = await compare(password, clientEntity.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas');
        if (process.env.SECRET == undefined)
            throw new BadRequestException('Chave secreta não encontrada');
        const token = sign({ id: clientEntity.id }, process.env.SECRET, {
            expiresIn: '7d',
        });
        return { token };
    }
}
