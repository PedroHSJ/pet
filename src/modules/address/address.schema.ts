import {
    CITY_MAX_LENGTH,
    CITY_MIN_LENGTH,
    CITY_REQUIRED,
    COMPLEMENT_MAX_LENGTH,
    COMPLEMENT_MIN_LENGTH,
    COMPLEMENT_REQUIRED,
    NEIGHBORHOOD_MAX_LENGTH,
    NEIGHBORHOOD_MIN_LENGTH,
    NEIGHBORHOOD_REQUIRED,
    NUMBER_MAX_LENGTH,
    NUMBER_MIN_LENGTH,
    NUMBER_REQUIRED,
    POSTAL_CODE_MAX_LENGTH,
    POSTAL_CODE_MIN_LENGTH,
    POSTAL_CODE_REQUIRED,
    STATE_MAX_LENGTH,
    STATE_MIN_LENGTH,
    STATE_REQUIRED,
    STREET_MAX_LENGTH,
    STREET_MIN_LENGTH,
    STREET_REQUIRED,
} from 'src/constants';
import * as Yup from 'yup';

export const AddressSchema = Yup.object().shape({
    street: Yup.string()
        .min(2, STREET_MIN_LENGTH)
        .max(255, STREET_MAX_LENGTH)
        .required(STREET_REQUIRED),
    number: Yup.string()
        .min(1, NUMBER_MIN_LENGTH)
        .max(10, NUMBER_MAX_LENGTH)
        .required(NUMBER_REQUIRED),
    complement: Yup.string()
        .min(2, COMPLEMENT_MIN_LENGTH)
        .max(255, COMPLEMENT_MAX_LENGTH),
    neighborhood: Yup.string()
        .min(2, NEIGHBORHOOD_MIN_LENGTH)
        .max(255, NEIGHBORHOOD_MAX_LENGTH)
        .required(NEIGHBORHOOD_REQUIRED),
    city: Yup.string()
        .min(2, CITY_MIN_LENGTH)
        .max(255, CITY_MAX_LENGTH)
        .required(CITY_REQUIRED),
    state: Yup.string()
        .min(2, STATE_MIN_LENGTH)
        .max(255, STATE_MAX_LENGTH)
        .required(STATE_REQUIRED),
    postalCode: Yup.string()
        .min(8, POSTAL_CODE_MIN_LENGTH)
        .max(8, POSTAL_CODE_MAX_LENGTH)
        .required(POSTAL_CODE_REQUIRED),
});
