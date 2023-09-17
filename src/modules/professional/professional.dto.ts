import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from 'src/enums/gender';

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
        description: 'Gender of the professional',
        enum: Gender,
    })
    gender: Gender;
    @ApiPropertyOptional({
        description: 'Phone of the professional',
        minLength: 2,
        maxLength: 255,
    })
    phone?: string;

    @ApiPropertyOptional({
        description: 'Professionals active status',
    })
    active?: boolean;
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

    @ApiPropertyOptional({
        description: 'Professionals active status',
    })
    active?: boolean;
    @ApiPropertyOptional({
        description: 'Gender of the pet',
        enum: Gender,
    })
    gender?: Gender;
}
