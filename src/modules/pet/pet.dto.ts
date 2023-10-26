import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BreedDTO } from '../breed/breed.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Specie } from '../../enums/specie';
import { Gender } from '../../enums/gender';

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
    // @ApiProperty({
    //     description: 'Breed of the pet',
    //     type: BreedDTO,
    // })
    // breed: BreedDTO;

    @ApiProperty({
        description: 'Breed id of the pet',
        type: UUID,
    })
    breedId: string;

    @ApiProperty({
        description: 'Client id of the pet',
        type: UUID,
    })
    clientId: string;

    @ApiProperty({
        description: 'Specie id of the pet',
        type: UUID,
    })
    specieId: string;

    // @ApiProperty({
    //     description: 'Specie of the pet',
    //     enum: ['DOG', 'CAT'],
    // })
    // specie: Specie;

    @ApiProperty({
        description: 'Gender of the pet',
        enum: Gender,
    })
    gender: Gender;

    @ApiProperty({
        description: 'Date of birth of the pet',
        example: '2020-01-01',
    })
    dateOfBirth: Date;
}

export class PetParamsDTO {
    @ApiPropertyOptional({
        description: 'Name of the pet',
        minLength: 2,
        maxLength: 255,
    })
    name: string;
    @ApiPropertyOptional({
        description: 'Weight of the pet',
        minimum: 0,
    })
    weight: number;

    // @ApiPropertyOptional({
    //     description: 'Specie of the pet',
    //     enum: ['DOG', 'CAT'],
    // })
    // specie: Specie;

    @ApiPropertyOptional({
        description: 'Specie id of the pet',
        type: UUID,
    })
    specieId: string;

    @ApiPropertyOptional({
        description: 'Gender of the pet',
        enum: Gender,
    })
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Date of birth of the pet',
    })
    dateOfBirth: Date;
}
