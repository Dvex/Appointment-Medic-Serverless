import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository'

export class UpdateAppointmentStatus {
  constructor(private readonly repo: AppointmentRepository) {}

  async execute(appointmentId: string, status: 'completed') {
    await this.repo.updateStatus(appointmentId, status)
  }
}