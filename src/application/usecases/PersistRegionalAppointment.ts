import { RegionalAppointmentRepository } from '../../domain/repositories/RegionalAppointmentRepository'

export class PersistRegionalAppointmentUseCase {
  constructor(private readonly regionalRepo: RegionalAppointmentRepository) {}

  async execute(data: { insuredId: string; scheduleId: number; countryISO: 'PE' | 'CL' }) {
    await this.regionalRepo.save(data)
  }
}