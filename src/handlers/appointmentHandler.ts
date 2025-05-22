import {
  APIGatewayProxyEvent,
  SQSEvent,
  Context,
  APIGatewayProxyResult
} from 'aws-lambda'

import { createAppointmentFactory } from '../factories/createAppointmentFactory'
import { listAppointmentsFactory } from '../factories/listAppointmentsFactory'
import { updateAppointmentStatusFactory } from '../factories/updateAppointmentStatusFactory'

export const handler = async (
  event: APIGatewayProxyEvent | SQSEvent,
  context: Context
): Promise<APIGatewayProxyResult | void> => {

  try {
    // POST /appointment
    if ('httpMethod' in event && event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}')
      const { insuredId, scheduleId, countryISO } = body

      if (!insuredId || !scheduleId || !countryISO) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing required fields' })
        }
      }

      const useCase = createAppointmentFactory()
      const appointment = await useCase.execute({ insuredId, scheduleId, countryISO })

      return {
        statusCode: 201,
        body: JSON.stringify(appointment)
      }
    }

    // GET /appointment/{insuredId}
    if ('httpMethod' in event && event.httpMethod === 'GET' && event.pathParameters?.insuredId) {
      const useCase = listAppointmentsFactory()
      const appointments = await useCase.execute(event.pathParameters.insuredId)

      return {
        statusCode: 200,
        body: JSON.stringify(appointments)
      }
    }

    // Evento desde SQS
    if ('Records' in event) {
      const useCase = updateAppointmentStatusFactory()

      const promises = event.Records.map(async (record: SQSEvent['Records'][0]) => {
        const message = JSON.parse(record.body)
        if (message.detail.appointmentId) {
          await useCase.execute(message.appointmentId, 'completed')
        }
      })

      await Promise.all(promises)
      return
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Unsupported route or event type' })
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    }
  }
}
