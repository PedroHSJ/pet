import { ApiProperty } from '@nestjs/swagger';

export class ProcedureDTO {
    @ApiProperty({
        description: 'Name of the procedure',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiProperty({
        description: 'Code of the procedure',
        minLength: 2,
        maxLength: 255,
    })
    code: string;
    @ApiProperty({
        description: 'Price of the procedure',
        minLength: 2,
        maxLength: 255,
    })
    price: number;
}
