import { ApiProperty } from '@nestjs/swagger';
import { NaturalFood } from '../enums/naturalFood.enum';
import { Portion } from '../enums/portion.enum';

export class FoodDTO {
    @ApiProperty({
        type: 'enum',
        enum: Portion,
        nullable: false,
    })
    portion: Portion;
    @ApiProperty({
        type: 'enum',
        enum: NaturalFood,
        nullable: false,
    })
    naturalFood: NaturalFood;
}
