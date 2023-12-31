import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/decorators/public.decorators';
import { hash } from 'bcrypt';
import { ProfessionalService } from '../professional/professional.service';
import { sign } from 'jsonwebtoken';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../client/client.service';
class sendVerificationCodeDTO {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'email@email.com',
    })
    email: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Pedro Henrique',
    })
    name: string;
}

class sendVerificationCodeUpdatePasswordDTO {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'email@email.com',
    })
    email: string;
}
class compareVerificationCodeDTO {
    email: string;
    code: string;
}

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
        private readonly clientService: ClientService,
    ) {}

    @Post('/send-verification-code')
    @Public()
    async sendVerificationCode(@Body() body: sendVerificationCodeDTO) {
        try {
            if (!body.email)
                throw new BadRequestException('Email não informado');
            const code = this.generateCode();

            await this.emailService.sendVerificationCode(
                body.email,
                body.name,
                code,
                1,
            );
            return hash(code, 10);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('/update-password/send-verification-code')
    @Public()
    async sendVerificationCodeUpdatePassword(
        @Body() body: sendVerificationCodeUpdatePasswordDTO,
    ) {
        try {
            if (!body.email)
                throw new BadRequestException('Email não informado');
            const code = this.generateCode();

            const client = await this.clientService.findByParams(1, 1, 'ASC', {
                email: body.email,
            });
            if (!client) return hash(code, 10);

            await this.emailService.sendVerificationCode(
                body.email,
                client[0].name,
                code,
                7,
                client[0].id,
            );
            return hash(code, 10);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    generateCode(): string {
        const code = Math.floor(Math.random() * 1000000).toString();
        return code.padStart(6, '0');
    }
}
