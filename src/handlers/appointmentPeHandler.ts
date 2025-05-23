import { createMySQLAppointmentFactory } from '../factories/createMySQLAppointmentFactory'
import { SQSEvent, SQSHandler } from 'aws-lambda'

export const handler: SQSHandler = async (event: SQSEvent) => {
  const useCase = createMySQLAppointmentFactory()

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body)
      const message = JSON.parse(body.Message)

      const { insuredId, scheduleId, countryISO } = message

      if (countryISO === 'PE') {
        await useCase.execute({ insuredId, scheduleId, countryISO })
      }
    } catch (error) {
      console.error('Error processing record:', error)
    }
  }
}