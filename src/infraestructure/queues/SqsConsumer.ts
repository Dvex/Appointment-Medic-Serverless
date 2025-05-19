import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs'
import { PersistRegionalAppointmentUseCase } from '../../application/usecases/PersistRegionalAppointment'

export class SqsConsumer {
  private readonly client = new SQSClient({})

  constructor(private readonly queueUrl: string, private readonly useCase: PersistRegionalAppointmentUseCase) {}

  async poll(): Promise<void> {
    const result = await this.client.send(
      new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 10
      })
    )

    for (const msg of result.Messages || []) {
      const body = JSON.parse(msg.Body || '{}')
      const message = JSON.parse(body.Message || '{}')
      await this.useCase.execute(message)

      await this.client.send(
        new DeleteMessageCommand({
          QueueUrl: this.queueUrl,
          ReceiptHandle: msg.ReceiptHandle!
        })
      )
    }
  }
}