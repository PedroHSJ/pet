import {
    EMAIL_INVALID,
    EMAIL_REQUIRED,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    NAME_REQUIRED,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQUIRED,
} from '../../constants';
import * as Yup from 'yup';

export const ClientSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, NAME_MIN_LENGTH)
        .max(255, NAME_MAX_LENGTH)
        .required(NAME_REQUIRED),
    email: Yup.string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
    password: Yup.string()
        .min(6, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH)
        .required(PASSWORD_REQUIRED),
    petsId: Yup.array().of(Yup.string().uuid().required()),
});
