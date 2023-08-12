import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role';

export class RoleDTO {
    @ApiProperty({
        type: String,
        description: 'Name of the role',
    })
    name: Role;
}
