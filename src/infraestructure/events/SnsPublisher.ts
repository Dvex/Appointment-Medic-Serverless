import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import { AppointmentEventPublisher } from '../../domain/repositories/AppointmentEventPublisher'
import { Appointment } from '../../domain/entities/Appointment'

export class SnsPublisher implements AppointmentEventPublisher {
  private readonly client = new SNSClient({})
  private readonly topicArn = process.env.SNS_TOPIC_ARN || ''

  async publishCreated(appointment: Appointment): Promise<void> {
    await this.client.send(
      new PublishCommand({
        TopicArn: this.topicArn,
        Message: JSON.stringify(appointment),
        MessageAttributes: {
          countryISO: {
            DataType: 'String',
            StringValue: appointment.countryISO
          }
        }
      })
    )
  }
}