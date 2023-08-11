import { ApiProperty } from '@nestjs/swagger';
import { AnamnesisDTO } from './anamnese/dto/anamnesis.dto';

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
        type: AnamnesisDTO,
        nullable: false,
    })
    anamnesis: AnamnesisDTO;
}
