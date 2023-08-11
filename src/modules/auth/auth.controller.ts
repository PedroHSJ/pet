import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/user')
    @HttpCode(HttpStatus.OK)
    async login(@Body() auth: AuthDTO): Promise<{ token: string }> {
        return await this.authService.login(auth);
    }
}
