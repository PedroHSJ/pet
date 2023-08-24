import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/decorators/public.decorators';
import { hash } from 'bcrypt';
interface sendVerificationCodeDTO {
    email: string;
}

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('/send-verification-code')
    @Public()
    async sendVerificationCode(@Body() body: sendVerificationCodeDTO) {
        try {
            if (!body.email)
                throw new BadRequestException('Email não informado');
            const code = this.generateCode();
            await this.emailService.sendVerificationCode(body.email, code);
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
