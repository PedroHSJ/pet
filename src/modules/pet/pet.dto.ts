import { ApiProperty } from '@nestjs/swagger';
import { BreedDTO } from '../breed/breed.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Specie } from 'src/utils/specie.enum';
import { Gender } from 'src/utils/gender.enum';

export class PetDTO {
    @ApiProperty({
        description: 'Name of the pet',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiProperty({
        description: 'Weight of the pet',
        minimum: 0,
    })
    weight: number;
    @ApiProperty({
        description: 'Breed of the pet',
        type: BreedDTO,
    })
    breed: BreedDTO;

    @ApiProperty({
        description: 'Client id of the pet',
        type: UUID,
    })
    clientId: string;

    @ApiProperty({
        description: 'Specie of the pet',
        enum: ['dog', 'cat'],
    })
    specie: Specie;

    @ApiProperty({
        description: 'Gender of the pet',
        enum: ['MALE', 'FEMANLE'],
    })
    gender: Gender;
}
