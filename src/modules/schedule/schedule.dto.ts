import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class ScheduleParamsDto {
    @ApiPropertyOptional({
        description: 'Establishment id',
        format: 'uuid',
    })
    establishmentId?: string;
    @ApiPropertyOptional({
        description: 'Professional id',
        format: 'uuid',
    })
    professionalId?: string;
    @ApiPropertyOptional({
        description: 'Client id',
        format: 'uuid',
    })
    clientId?: string;
    @ApiPropertyOptional({
        description: 'Day of schedule',
        format: 'date-time',
    })
    day?: Date;
}
