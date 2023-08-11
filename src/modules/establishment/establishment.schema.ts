import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, NAME_REQUIRED } from 'src/constants';
import * as Yup from 'yup';

export const EstablishmentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, NAME_MIN_LENGTH)
        .max(255, NAME_MAX_LENGTH)
        .required(NAME_REQUIRED),
    cnpj: Yup.string().min(14).required('CNPJ is required'),
});
