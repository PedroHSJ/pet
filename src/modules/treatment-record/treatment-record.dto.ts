import { ApiProperty } from '@nestjs/swagger';
import { AnamnesisDTO } from './anamnese/dto/anamnesis.dto';
import { FoodDTO } from './food/dto/food.dto';
import { MeasurementDTO } from './measurement/dto/measurement.dto';

export class TreatementRecordDTO {
    @ApiProperty({
        type: 'string',
        nullable: false,
        format: 'uuid',
        description: 'Schedule id',
    })
    scheduleId: string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 255,
    })
    mainComplaint: string;

    @ApiProperty({
        type: 'string',
        nullable: false,
        maxLength: 255,
        example:
            'Foi realizado o tratamento com o paciente e foi passado um medicamento para ele.',
    })
    treatmentPerformed: string;

    @ApiProperty({
        type: AnamnesisDTO,
        nullable: false,
    })
    anamnesis: AnamnesisDTO;

    @ApiProperty({
        type: FoodDTO,
        nullable: false,
    })
    food: FoodDTO;

    @ApiProperty({
        type: MeasurementDTO,
        nullable: false,
    })
    measurement: MeasurementDTO;
}
