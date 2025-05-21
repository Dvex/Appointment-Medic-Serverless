import { RegionalAppointmentRepository } from '../../domain/repositories/RegionalAppointmentRepository'
import { createPool, Pool } from 'mysql2/promise'
import {
  SecretsManagerClient,
  GetSecretValueCommand
} from '@aws-sdk/client-secrets-manager'

let pool: Pool | null = null

async function getDbConfigFromSecrets() {
  const secretArn = process.env.DB_SECRET_ARN!
  const client = new SecretsManagerClient({})
  const command = new GetSecretValueCommand({ SecretId: secretArn })
  const response = await client.send(command)

  if (!response.SecretString) {
    throw new Error('DB Secret is empty')
  }

  const secret = JSON.parse(response.SecretString)
  return {
    host: process.env.DB_ENDPOINT,
    port: Number(process.env.DB_PORT),
    user: secret.username,
    password: secret.password,
    database: secret.dbname
  }
}

export class MySQLAppointmentRepository implements RegionalAppointmentRepository {
  private async getPool(): Promise<Pool> {
    if (!pool) {
      const config = await getDbConfigFromSecrets()
      pool = createPool(config)
    }
    return pool
  }

  async save(data: { insuredId: string; scheduleId: number; countryISO: 'PE' | 'CL' }): Promise<void> {
    const db = await this.getPool()
    await db.execute(
      'INSERT INTO appointments (insuredId, scheduleId, countryISO) VALUES (?, ?, ?)',
      [data.insuredId, data.scheduleId, data.countryISO]
    )
  }
}
