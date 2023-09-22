import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DigestiveSystem } from '../enums/digestiveSystem.enum';
import { UrogenitalSystem } from '../enums/urogenitalSystem.enum';
import { CardioRespiratorySystem } from '../enums/cardiorespiratorySystem.enum';
import { NeurologicalSystem } from '../enums/neurologicalSystem.enum';
import { LocomotorSystem } from '../enums/locomotorSystem.enum';
import { Skin } from '../enums/skin.enum';
import { Eyes } from '../enums/eyes.enum';
import { Ears } from '../enums/ears.enum';
import { Environment } from '../enums/environment.enum';
import { MeasurementCondition } from '../../measurement/enums/hydration.enum';

export class AnamnesisDTO {
    @ApiProperty({
        type: 'enum',
        enum: DigestiveSystem,
        nullable: false,
    })
    digestiveSystem: DigestiveSystem;
    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherDigestiveSystem?: string;

    @ApiProperty({
        type: 'enum',
        enum: UrogenitalSystem,
        nullable: false,
    })
    urogenitalSystem: UrogenitalSystem;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherUrogenitalSystem?: string;

    @ApiProperty({
        type: 'enum',
        enum: CardioRespiratorySystem,
        nullable: false,
    })
    cardiorespiratorySystem: CardioRespiratorySystem;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherCardiorespiratorySystem?: string;

    @ApiProperty({
        type: 'enum',
        enum: NeurologicalSystem,
        nullable: false,
    })
    neurologicSystem: NeurologicalSystem;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherNeurologicSystem?: string;

    @ApiProperty({
        type: 'enum',
        enum: LocomotorSystem,
        nullable: false,
    })
    locomotorSystem: LocomotorSystem;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherLocomotorSystem?: string;

    @ApiProperty({
        type: 'enum',
        enum: Skin,
        nullable: false,
        description: 'Condition of the skin',
    })
    skin: Skin;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherSkin?: string;

    @ApiProperty({
        type: 'enum',
        enum: Eyes,
        nullable: false,
    })
    eyes: Eyes;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherEyes?: string;

    @ApiProperty({
        type: 'enum',
        enum: Ears,
        nullable: false,
    })
    ears: Ears;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherEars?: string;

    @ApiProperty({
        type: 'enum',
        enum: Environment,
        nullable: false,
        example: 'URBAN',
    })
    environment: Environment;

    @ApiPropertyOptional({
        maxLength: 255,
        nullable: true,
    })
    otherEnvironment?: string;

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
