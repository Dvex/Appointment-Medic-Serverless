import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository'
import { Appointment } from '../../domain/entities/Appointment'
import { DynamoDBClient, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

export class DynamoDBAppointmentRepository implements AppointmentRepository {
  private readonly tableName = 'Appointments'
  private readonly client = new DynamoDBClient({})

  async save(appointment: Appointment): Promise<void> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        appointmentId: { S: appointment.appointmentId },
        insuredId: { S: appointment.insuredId },
        scheduleId: { N: appointment.scheduleId.toString() },
        countryISO: { S: appointment.countryISO },
        status: { S: appointment.status }
      }
    })
    await this.client.send(command)
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'insuredId-index',
      KeyConditionExpression: 'insuredId = :insuredId',
      ExpressionAttributeValues: {
        ':insuredId': { S: insuredId }
      }
    })

    const result = await this.client.send(command)
    return (result.Items || []).map(item => {
      const data = unmarshall(item)
      return new Appointment(data.appointmentId, data.insuredId, data.scheduleId, data.countryISO, data.status)
    })
  }

  async updateStatus(appointmentId: string, status: 'completed'): Promise<void> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: { appointmentId: { S: appointmentId } },
      UpdateExpression: 'SET #s = :status',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':status': { S: status } }
    })
    await this.client.send(command)
  }
}