import { ApiProperty } from '@nestjs/swagger';
import { RoleDTO } from '../role/role.dto';
import { Role } from 'src/enums/role';

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
        enum: Role,
        description: 'Roles of the user',
    })
    role: RoleDTO;
}
