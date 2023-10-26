import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SpecieDTO {
    @ApiProperty({
        description: 'Name of the specie',
        minLength: 2,
        maxLength: 255,
    })
    name: string;

    @ApiProperty({
        description: 'Pet class id of the specie',
        type: String,
    })
    petClassId: string;
}

export class SpecieParamsDTO {
    @ApiPropertyOptional({
        description: 'Name of the specie',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
}
