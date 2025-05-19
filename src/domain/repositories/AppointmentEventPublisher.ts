import { Appointment } from '../entities/Appointment'

export interface AppointmentEventPublisher {
  publishCreated(appointment: Appointment): Promise<void>
}