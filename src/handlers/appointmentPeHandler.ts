import { createMySQLAppointmentFactory } from '../factories/createMySQLAppointmentFactory'
import { SQSEvent, SQSHandler } from 'aws-lambda'

export const handler: SQSHandler = async (event: SQSEvent) => {
  const useCase = createMySQLAppointmentFactory()

  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body)
      const { insuredId, scheduleId, countryISO } = body

      if (countryISO === 'PE') {
        await useCase.execute({ insuredId, scheduleId, countryISO })
      }
    } catch (error) {
      console.error('Error processing record:', error)
    }
  }
}
