import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge'
import { Appointment } from '../../domain/entities/Appointment'

export class EventBridgePublisher {
  private readonly client = new EventBridgeClient({})
  private readonly eventBusName = process.env.EVENT_BUS_NAME || ''

  async publishCompleted(appointment: Appointment): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Source: 'appointment.event',
          EventBusName: this.eventBusName,
          DetailType: 'AppointmentCompleted',
          Detail: JSON.stringify({
            appointmentId: appointment.appointmentId,
            insuredId: appointment.insuredId,
            scheduleId: appointment.scheduleId,
            countryISO: appointment.countryISO
          })
        }
      ]
    })

    await this.client.send(command)
  }
}