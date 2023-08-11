import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/utils/role.enum';

export class RoleDTO {
    @ApiProperty({
        type: String,
        description: 'Name of the role',
    })
    name: Role;
}
