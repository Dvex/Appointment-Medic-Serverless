import { GetAppointmentByInsuredId } from '../application/usecases/GetAppointmentByInsuredI'
import { DynamoDBAppointmentRepository } from '../infraestructure/database/DynamoDBAppointmentRepository'

export function listAppointmentsFactory() {
  const repo = new DynamoDBAppointmentRepository()
  return new GetAppointmentByInsuredId(repo)
}