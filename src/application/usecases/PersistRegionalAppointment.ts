import { RegionalAppointmentRepository } from '../../domain/repositories/RegionalAppointmentRepository'
import { EventBridgePublisher } from '../../infraestructure/events/EventBridgePublisher'

export class PersistRegionalAppointmentUseCase {
  constructor(
    private readonly regionalRepo: RegionalAppointmentRepository,
    private readonly publisher: EventBridgePublisher
  ) {}

  async execute(data: { insuredId: string; scheduleId: number; countryISO: 'PE' | 'CL' }) {
    await this.regionalRepo.save(data)

    // Generamos un "appointmentId" igual al lambda inicial para mantener la coherencia
    const appointmentId = `${data.insuredId}-${data.scheduleId}`

    await this.publisher.publishCompleted({
      appointmentId,
      insuredId: data.insuredId,
      scheduleId: data.scheduleId,
      countryISO: data.countryISO,
      status: 'completed'
    })
  }
}
