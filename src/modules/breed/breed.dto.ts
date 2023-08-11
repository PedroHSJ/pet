import { ApiProperty } from '@nestjs/swagger';

export class BreedDTO {
    @ApiProperty({
        description: 'Name of the breed',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
}
