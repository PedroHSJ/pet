import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDTO } from '../address/address.dto';

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

    // @ApiProperty({
    //     description: 'Address of the establishment',
    // })
    // addressId: string;

    @ApiProperty({
        description: 'Address of the establishment',
    })
    address: AddressDTO;
}

export class EstablishmentParamsDTO {
    @ApiPropertyOptional({
        description: 'Name of the establishment',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiPropertyOptional({
        description: 'CNPJ of the establishment',
        minLength: 14,
        maxLength: 14,
    })
    cnpj: string;

    @ApiPropertyOptional()
    active: boolean;
}
