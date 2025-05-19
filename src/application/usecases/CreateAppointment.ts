import { Appointment } from '../../domain/entities/Appointment'
import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository'
import { AppointmentEventPublisher } from '../../domain/repositories/AppointmentEventPublisher'

export class CreateAppointment {
  constructor(
    private readonly repo: AppointmentRepository,
    private readonly publisher: AppointmentEventPublisher
  ) {}

  async execute(data: { insuredId: string; scheduleId: number; countryISO: 'PE' | 'CL' }) {
    const appointment = Appointment.create(data)
    await this.repo.save(appointment)
    await this.publisher.publishCreated(appointment)
    return appointment
  }
}
