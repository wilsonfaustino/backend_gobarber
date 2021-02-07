import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '13134654987',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('13134654987');
  });

  it('Should not allow to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 1, 6, 23);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '13134654987',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '13134654987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
