import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    NAME_REQUIRED,
} from '../../constants';
import * as Yup from 'yup';

export const BreedSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, NAME_MIN_LENGTH)
        .max(255, NAME_MAX_LENGTH)
        .required(NAME_REQUIRED),
});
