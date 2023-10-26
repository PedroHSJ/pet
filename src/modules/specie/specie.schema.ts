import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, REQUIRED } from 'src/constants';
import * as Yup from 'yup';

export const SpecieSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, NAME_MIN_LENGTH)
        .max(255, NAME_MAX_LENGTH)
        .required(REQUIRED),
    petClassId: Yup.string().uuid().required(REQUIRED),
});
