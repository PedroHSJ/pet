import { ApiProperty } from '@nestjs/swagger';

export class EstablishmentDTO {
    @ApiProperty({
        description: 'Name of the establishment',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiProperty({
        description: 'CNPJ of the establishment',
        minLength: 14,
        maxLength: 14,
    })
    cnpj: string;

    @ApiProperty({
        description: 'Address of the establishment',
    })
    addressId: string;
}
