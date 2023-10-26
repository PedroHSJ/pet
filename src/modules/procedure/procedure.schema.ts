import { REQUIRED } from 'src/constants';
import * as Yup from 'yup';

export const ProcedurePostSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED),
    code: Yup.string().required(REQUIRED),
    price: Yup.number().required(REQUIRED),
});
