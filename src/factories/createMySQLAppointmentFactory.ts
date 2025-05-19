import { PersistRegionalAppointmentUseCase } from '../application/usecases/PersistRegionalAppointment'
import { MySQLAppointmentRepository } from '../infraestructure/database/MySQLAppointmentRepository'

export function createMySQLAppointmentFactory(): PersistRegionalAppointmentUseCase {
  const repo = new MySQLAppointmentRepository()
  return new PersistRegionalAppointmentUseCase(repo)
}
