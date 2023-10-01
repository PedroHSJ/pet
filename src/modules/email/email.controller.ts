import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/decorators/public.decorators';
import { hash } from 'bcrypt';
import { ProfessionalService } from '../professional/professional.service';
import { sign } from 'jsonwebtoken';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
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

class compareVerificationCodeDTO {
    email: string;
    code: string;
}

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
        private readonly professionalService: ProfessionalService,
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
            );
            return hash(code, 10);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // @Post('/send-and-save-verification-code')
    // @Public()
    // async sendAndSaveVerificationCode(@Body() body: sendVerificationCodeDTO) {
    //     try {
    //         const code = this.generateCode();
    //         //await this.emailService.sendVerificationCode(body.email, code);

    //         const { items } = await this.professionalService.findAll({
    //             email: body.email,
    //         });

    //         if (items.length > 0) {
    //             const professional = items[0];
    //             professional.verificationCode = code;
    //             await this.professionalService.update(
    //                 professional.id,
    //                 professional,
    //             );
    //         }

    //         return hash(code, 10);
    //     } catch (error) {
    //         throw new BadRequestException(error.message);
    //     }
    // }

    // @Post('/compare-verification-code')
    // @Public()
    // async compareVerificationCode(@Body() body: compareVerificationCodeDTO) {
    //     try {
    //         const { items } = await this.professionalService.findAll({
    //             email: body.email,
    //         });

    //         if (items.length == 0)
    //             throw new BadRequestException('Email não encontrado');

    //         const professional = items[0];
    //         if (professional.verificationCode != body.code)
    //             throw new BadRequestException('Código inválido');

    //         const token = sign({ id: professional.id }, process.env.SECRET, {
    //             expiresIn: '7d',
    //         });

    //         return { token };
    //     } catch (error) {
    //         throw new BadRequestException(error.message);
    //     }
    // }

    generateCode(): string {
        const code = Math.floor(Math.random() * 1000000).toString();
        return code.padStart(6, '0');
    }
}
