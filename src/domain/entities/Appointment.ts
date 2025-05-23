export class Appointment {
  constructor(
    public readonly appointmentId: string,
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: 'PE' | 'CL',
    public status: 'pending' | 'completed'
  ) {}

  static create(data: {
    insuredId: string;
    scheduleId: number;
    countryISO: 'PE' | 'CL';
  }): Appointment {
    const appointmentId = `${data.insuredId}-${data.scheduleId}`
    return new Appointment(appointmentId, data.insuredId, data.scheduleId, data.countryISO, 'pending')
  }
}