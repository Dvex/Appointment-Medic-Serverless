import { PersistRegionalAppointmentUseCase } from '../application/usecases/PersistRegionalAppointment'
import { MySQLAppointmentRepository } from '../infraestructure/database/MySQLAppointmentRepository'
import { EventBridgePublisher } from '../infraestructure/events/EventBridgePublisher'

export function createMySQLAppointmentFactory(): PersistRegionalAppointmentUseCase {
  const repo = new MySQLAppointmentRepository()
  const publisher = new EventBridgePublisher()
  return new PersistRegionalAppointmentUseCase(repo, publisher)
}
