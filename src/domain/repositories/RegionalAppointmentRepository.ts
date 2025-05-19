export interface RegionalAppointmentRepository {
  save(data: { insuredId: string; scheduleId: number; countryISO: 'PE' | 'CL' }): Promise<void>
}