export interface Appointment {
  /**
   * ID de la cita generada automáticamente
   * @example "00001-1716143456789"
   */
  appointmentId: string;

  /**
   * Código del asegurado
   * @example "00001"
   */
  insuredId: string;

  /**
   * ID del horario
   * @example 456
   */
  scheduleId: number;

  /**
   * País de origen
   * @example "CL"
   */
  countryISO: 'PE' | 'CL';

  /**
   * Estado de la cita
   * @example "pending"
   */
  status: 'pending' | 'completed';
}