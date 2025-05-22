export interface AppointmentInput {
  /**
   * Código del asegurado (5 dígitos, puede tener ceros al inicio)
   * @example "00001"
   */
  insuredId: string;

  /**
   * Identificador del horario para la cita
   * @example 123
   */
  scheduleId: number;

  /**
   * Código del país
   * @example "PE"
   */
  countryISO: 'PE' | 'CL';
}