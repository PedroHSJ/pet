import { REQUIRED } from '../../constants';
import * as Yup from 'yup';
import { DigestiveSystem } from './anamnese/enums/digestiveSystem.enum';
import { UrogenitalSystem } from './anamnese/enums/urogenitalSystem.enum';
import { CardioRespiratorySystem } from './anamnese/enums/cardiorespiratorySystem.enum';
import { NeurologicalSystem } from './anamnese/enums/neurologicalSystem.enum';
import { LocomotorSystem } from './anamnese/enums/locomotorSystem.enum';
import { Skin } from './anamnese/enums/skin.enum';
import { Eyes } from './anamnese/enums/eyes.enum';
import { Ears } from './anamnese/enums/ears.enum';
import { Environment } from './anamnese/enums/environment.enum';

export const TreatmentRecordSchema = Yup.object().shape({
    scheduleId: Yup.string().uuid().required(REQUIRED),
    mainComplaint: Yup.string().max(255).required(REQUIRED),
    anamnesis: Yup.object()
        .shape({
            digestiveSystem: Yup.mixed()
                .oneOf(Object.values(DigestiveSystem))
                .required(REQUIRED),
            otherDigestiveSystem: Yup.string().max(255),

            urogenitalSystem: Yup.mixed()
                .oneOf(Object.values(UrogenitalSystem))
                .required(REQUIRED),
            otherUrogenitalSystem: Yup.string().max(255),

            cardiorespiratorySystem: Yup.mixed()
                .oneOf(Object.values(CardioRespiratorySystem))
                .required(REQUIRED),
            otherCardiorespiratorySystem: Yup.string().max(255),

            neurologicSystem: Yup.mixed()
                .oneOf(Object.values(NeurologicalSystem))
                .required(REQUIRED),
            otherNeurologicSystem: Yup.string().max(255),

            locomotorSystem: Yup.mixed()
                .oneOf(Object.values(LocomotorSystem))
                .required(REQUIRED),
            otherLocomotorSystem: Yup.string().max(255),

            skin: Yup.mixed().oneOf(Object.values(Skin)).required(REQUIRED),
            otherSkin: Yup.string().max(255),

            eyes: Yup.mixed().oneOf(Object.values(Eyes)).required(REQUIRED),
            otherEyes: Yup.string().max(255),

            ears: Yup.mixed().oneOf(Object.values(Ears)).required(REQUIRED),
            otherEars: Yup.string().max(255),

            environment: Yup.mixed()
                .oneOf(Object.values(Environment))
                .required(REQUIRED),

            otherEnvironment: Yup.string().max(255),
        })
        .required(REQUIRED),
});
