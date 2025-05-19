import { UpdateAppointmentStatus } from '../application/usecases/UpdateAppointmentStatus'
import { DynamoDBAppointmentRepository } from '../infraestructure/database/DynamoDBAppointmentRepository'

export function updateAppointmentStatusFactory() {
  const repo = new DynamoDBAppointmentRepository()
  return new UpdateAppointmentStatus(repo)
}