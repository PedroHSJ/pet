import * as Yup from 'yup';
import {
    EMAIL_INVALID,
    EMAIL_REQUIRED,
    NAME_REQUIRED,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQUIRED,
} from 'src/constants';

export const ProfessinalSchema = Yup.object().shape({
    name: Yup.string().required(NAME_REQUIRED),
    email: Yup.string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
    password: Yup.string()
        .min(6, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH)
        .required(PASSWORD_REQUIRED),
    crmv: Yup.string().required('CRMV is required'),
});
