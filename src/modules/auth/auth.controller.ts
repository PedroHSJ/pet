import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowGuad } from './auth.guard';
import { Public } from '../../decorators/public.decorators';
import { EmailService } from '../email/email.service';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly emailService: EmailService,
    ) {}

    @Post('')
    @Public()
    @HttpCode(HttpStatus.OK)
    async login(@Body() auth: AuthDTO): Promise<{ token: string }> {
        return await this.authService.login(auth);
    }
}

// await this.emailService.sendVerificationCode(
//     'pedrohenriquesj.pro@gmail.com',
// );
