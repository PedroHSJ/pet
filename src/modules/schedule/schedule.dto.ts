import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDto {
    @ApiProperty({
        description: 'Establishment id',
        format: 'uuid',
    })
    establishmentId: string;
    @ApiProperty({
        description: 'Professional id',
        format: 'uuid',
    })
    professionalId: string;
    @ApiProperty({
        description: 'Client id',
        format: 'uuid',
    })
    clientId: string;
    @ApiProperty({
        description: 'Day of schedule',
        format: 'date-time',
    })
    day: Date;
}
