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
import { Public } from './decorators/public.decorators';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('')
    @Public()
    @HttpCode(HttpStatus.OK)
    async login(@Body() auth: AuthDTO): Promise<{ token: string }> {
        return await this.authService.login(auth);
    }
}
