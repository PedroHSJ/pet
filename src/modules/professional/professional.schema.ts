import * as Yup from 'yup';
import {
    EMAIL_INVALID,
    EMAIL_REQUIRED,
    NAME_REQUIRED,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REQUIRED,
    REQUIRED,
} from '../../constants';
import { Gender } from 'src/enums/gender';

export const ProfessinalPostSchema = Yup.object().shape({
    name: Yup.string().min(3).required(NAME_REQUIRED),
    email: Yup.string().email(EMAIL_INVALID).required(EMAIL_REQUIRED),
    password: Yup.string()
        .min(6, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH)
        .required(PASSWORD_REQUIRED),
    crmv: Yup.string().required('CRMV is required'),
    gender: Yup.string()
        .oneOf(Object.keys(Gender).map((key) => Gender[key]))
        .required(REQUIRED),
});

export const ProfessinalPutSchema = Yup.object().shape({
    name: Yup.string().min(3),
    email: Yup.string().email(EMAIL_INVALID),
    password: Yup.string()
        .min(6, PASSWORD_MIN_LENGTH)
        .max(255, PASSWORD_MAX_LENGTH),
    crmv: Yup.string(),
});
