import { AppointmentStatusEventListener } from '../../domain/repositories/AppointmentStatusEventListener'
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs'
import { UpdateAppointmentStatus } from '../../application/usecases/UpdateAppointmentStatus'

export class SQSEventBridgeListener implements AppointmentStatusEventListener {
  private readonly client = new SQSClient({})
  private readonly queueUrl = process.env.EVENTBRIDGE_SQS_URL || ''

  constructor(private readonly useCase: UpdateAppointmentStatus) {}

  async listen(): Promise<void> {
    const result = await this.client.send(
      new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 10
      })
    )

    for (const msg of result.Messages || []) {
      const body = JSON.parse(msg.Body || '{}')
      const detail = JSON.parse(body.Detail || '{}')

      await this.useCase.execute(detail.appointmentId, 'completed')

      await this.client.send(
        new DeleteMessageCommand({
          QueueUrl: this.queueUrl,
          ReceiptHandle: msg.ReceiptHandle!
        })
      )
    }
  }
}