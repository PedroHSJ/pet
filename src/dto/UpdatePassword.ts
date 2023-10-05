import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDTO {
    @ApiProperty({
        description: 'Nova senha do usuário',
        example: '123456',
    })
    password: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'email@email.com',
    })
    email: string;
    @ApiProperty({
        description: 'Código de verificação',
        example: '123456',
    })
    verificationCode: string;
}
