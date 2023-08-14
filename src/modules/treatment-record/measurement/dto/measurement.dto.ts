import { ApiProperty } from '@nestjs/swagger';
import { MeasurementCondition } from '../enums/hydration.enum';

export class MeasurementDTO {
    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 3,
        example: '36.5',
    })
    temperature: string;
    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 6,
        example: '120/80',
    })
    bloodPressure: string;
    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 3,
        example: '80',
    })
    heartRate: string;
    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 3,
        example: '20',
    })
    respiratoryRate: string;
    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 3,
        example: '80',
    })
    glycemia: string;
    @ApiProperty({
        type: 'enum',
        enum: MeasurementCondition,
        nullable: false,
    })
    hydration: MeasurementCondition;
    @ApiProperty({
        type: 'enum',
        enum: MeasurementCondition,
        nullable: false,
    })
    mucous: MeasurementCondition;
    @ApiProperty({
        type: 'enum',
        enum: MeasurementCondition,
        nullable: false,
    })
    oralCavity: MeasurementCondition;
    @ApiProperty({
        type: 'enum',
        enum: MeasurementCondition,
        nullable: false,
    })
    nasalCavity: MeasurementCondition;
    @ApiProperty({
        type: 'enum',
        enum: MeasurementCondition,
        nullable: false,
    })
    lymphNodes: MeasurementCondition;
}
