import { ApiProperty } from '@nestjs/swagger';
import { compare } from 'bcrypt';

export class AuthDTO {
    @ApiProperty({
        type: String,
        description: 'Email of the user',
    })
    email: string;
    @ApiProperty({
        type: String,
        description: 'Password of the user',
    })
    password: string;

    @ApiProperty({
        type: String,
        description: 'Scope of the user',
        example: 'USER',
    })
    scope: 'CLIENT' | 'USER' | 'PROFESSIONAL';
}
