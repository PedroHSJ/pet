import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDTO {
    @ApiProperty({
        description: 'Street',
        example: 'Rua dos Bobos',
    })
    street: string;
    @ApiProperty({
        description: 'Number',
        example: '0',
    })
    number: string;
    @ApiPropertyOptional({
        description: 'Complement',
        example: 'Apto 101',
    })
    complement?: string;
    @ApiProperty({
        description: 'Neighborhood',
        example: 'Vila do Chaves',
    })
    neighborhood: string;
    @ApiProperty({
        description: 'City',
        example: 'São Paulo',
    })
    city: string;
    @ApiProperty({
        description: 'State',
        example: 'SP',
    })
    state: string;
    @ApiProperty({
        description: 'Postal Code',
        example: '00000000',
        minLength: 8,
        maxLength: 8,
    })
    postalCode: string;
}

export class AddressParamsDTO {
    @ApiPropertyOptional({
        description: 'Street',
    })
    street: string;
    @ApiPropertyOptional({
        description: 'Number',
    })
    number: string;
    @ApiPropertyOptional({
        description: 'Complement',
    })
    complement?: string;
    @ApiPropertyOptional({
        description: 'Neighborhood',
    })
    neighborhood: string;
    @ApiPropertyOptional({
        description: 'City',
    })
    city: string;
    @ApiPropertyOptional({
        description: 'State',
    })
    state: string;
    @ApiPropertyOptional({
        description: 'Postal Code',
        minLength: 8,
        maxLength: 8,
    })
    postalCode: string;
}
