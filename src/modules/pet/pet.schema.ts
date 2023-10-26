import { Gender } from 'src/enums/gender';
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    REQUIRED,
    WEIGHT_MIN,
} from '../../constants';
import * as Yup from 'yup';

export const PetSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, NAME_MIN_LENGTH)
        .max(255, NAME_MAX_LENGTH)
        .required(REQUIRED),
    weight: Yup.number().min(0, WEIGHT_MIN).required(REQUIRED),
    breedId: Yup.string().uuid().required(REQUIRED),
    clientId: Yup.string().uuid().required(REQUIRED),
    specieId: Yup.string().uuid().required(REQUIRED),
    gender: Yup.string()
        .oneOf(Object.keys(Gender).map((key) => Gender[key]))
        .required(REQUIRED),
    dateOfBirth: Yup.date().required(REQUIRED),
});
