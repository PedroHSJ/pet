import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleDTO } from '../role/role.dto';
import { Role } from '../../enums/role';
import { AddressDTO } from '../address/address.dto';
import { Gender } from 'src/enums/gender';

interface Pet {
    id: string;
}

export class ClientDTO {
    @ApiProperty({
        description: 'Name of the client',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiProperty({
        description: 'Email of the client',
    })
    email: string;
    @ApiProperty({
        description: 'Password of the client',
        minLength: 6,
        maxLength: 255,
    })
    password: string;
    role: RoleDTO = {
        name: Role.CLIENT,
    };

    @ApiProperty({
        description: 'Phone of the client',
        example: '83999547865',
    })
    phone: string;

    @ApiProperty({
        description: 'Gender of the client',
        enum: Gender,
    })
    gender: Gender;

    // @ApiPropertyOptional({
    //     description: 'Pets of the client',
    //     type: Array,
    // })
    // petsId?: Pet[];

    @ApiProperty({
        description: 'Address of the client',
    })
    address: AddressDTO;
}

//class para get by param
export class ClientParamDTO {
    @ApiPropertyOptional({
        description: 'Id of the client',
    })
    id: string;
    @ApiPropertyOptional({
        description: 'Name of the client',
        minLength: 2,
        maxLength: 255,
    })
    name?: string;
    @ApiPropertyOptional({
        description: 'Email of the client',
    })
    email?: string;

    @ApiPropertyOptional({
        description: 'Phone of the client',
        example: '83999547865',
    })
    phone?: string;

    @ApiPropertyOptional({
        description: 'Gender of the pet',
        enum: Gender,
    })
    gender?: Gender;

    @ApiPropertyOptional({
        description: 'Address of the client',
    })
    address: AddressDTO;
}
