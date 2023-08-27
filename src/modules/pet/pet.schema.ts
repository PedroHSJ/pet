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
    breed: Yup.object().shape({
        name: Yup.string()
            .min(2, NAME_MIN_LENGTH)
            .max(255, NAME_MAX_LENGTH)
            .required(REQUIRED),
    }),
    clientId: Yup.string().uuid().required(REQUIRED),
    specie: Yup.string().oneOf(['DOG', 'CAT']).required(REQUIRED),
    gender: Yup.string().oneOf(['MALE', 'FEMALE']).required(REQUIRED),
    dateOfBirth: Yup.date().required(REQUIRED),
});
