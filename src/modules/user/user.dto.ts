import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/utils/role.enum';
import { RoleDTO } from '../role/role.dto';

export class UserDTO {
    @ApiProperty({
        type: String,
        description: 'Name of the user',
    })
    name: string;
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
        enum: RoleEnum,
        description: 'Roles of the user',
    })
    role: RoleDTO;
}
