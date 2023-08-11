import * as Yup from 'yup';

export const ScheduleSchema = Yup.object().shape({
    establishmentId: Yup.string().uuid().required(),
    professionalId: Yup.string().uuid().required(),
    clientId: Yup.string().uuid().required(),
    day: Yup.date().required(),
});
