import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfessionalDTO {
    @ApiProperty({
        description: 'Name of the professional',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiProperty({
        description: 'Email of the professional',
    })
    email: string;
    @ApiProperty({
        description: 'Password of the professional',
        minLength: 6,
        maxLength: 255,
    })
    password: string;
    @ApiProperty({
        description: 'CRMV of the professional',
        minLength: 2,
        maxLength: 255,
    })
    crmv: string;
    @ApiProperty({
        description: 'Phone of the professional',
        minLength: 2,
        maxLength: 255,
    })
    phone?: string;
}

export class ProfessionalParamsDTO {
    @ApiPropertyOptional({
        description: 'Name of the professional',
        minLength: 2,
        maxLength: 255,
    })
    name?: string;
    @ApiPropertyOptional({
        description: 'Email of the professional',
    })
    email?: string;
    @ApiPropertyOptional({
        description: 'CRMV of the professional',
        minLength: 2,
        maxLength: 255,
    })
    crmv?: string;
    @ApiPropertyOptional({
        description: 'Phone of the professional',
        minLength: 2,
        maxLength: 255,
    })
    phone?: string;
}
