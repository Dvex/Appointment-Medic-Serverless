export interface AppointmentStatusEventListener {
  listen(): Promise<void>
}