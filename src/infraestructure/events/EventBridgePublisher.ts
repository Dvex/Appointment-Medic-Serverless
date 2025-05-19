import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge'

export class EventBridgePublisher {
  private readonly client = new EventBridgeClient({})
  private readonly busName = process.env.EVENT_BUS_NAME || 'default'

  async publish(event: any): Promise<void> {
    await this.client.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: 'appointment.status',
            DetailType: 'AppointmentCompleted',
            Detail: JSON.stringify(event),
            EventBusName: this.busName
          }
        ]
      })
    )
  }
}