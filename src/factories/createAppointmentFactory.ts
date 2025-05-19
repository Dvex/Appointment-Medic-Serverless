import { CreateAppointment } from '../application/usecases/CreateAppointment'
import { DynamoDBAppointmentRepository } from '../infraestructure/database/DynamoDBAppointmentRepository'
import { SnsPublisher } from '../infraestructure/events/SnsPublisher'

export function createAppointmentFactory(): CreateAppointment {
  const repo = new DynamoDBAppointmentRepository()
  const publisher = new SnsPublisher()
  return new CreateAppointment(repo, publisher)
}