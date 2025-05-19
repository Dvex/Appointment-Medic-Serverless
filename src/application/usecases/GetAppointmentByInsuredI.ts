import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository'

export class GetAppointmentByInsuredId {
  constructor(private readonly repo: AppointmentRepository) {}

  async execute(insuredId: string) {
    return await this.repo.findByInsuredId(insuredId)
  }
}