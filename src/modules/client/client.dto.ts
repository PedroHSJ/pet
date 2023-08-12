import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleDTO } from '../role/role.dto';
import { Role } from 'src/enums/role';

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
    // @ApiPropertyOptional({
    //     description: 'Pets of the client',
    //     type: Array,
    // })
    // petsId?: Pet[];

    @ApiPropertyOptional({
        description: 'Address of the client',
        type: String,
    })
    addressId?: string;
}

//class para get by param
export class ClientParamDTO {
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
}
