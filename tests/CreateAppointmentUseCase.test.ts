import { CreateAppointment } from '../src/application/usecases/CreateAppointment'
import { Appointment } from '../src/domain/entities/Appointment'

describe('CreateAppointmentUseCase', () => {
  const mockRepo = {
    save: jest.fn(),
    findByInsuredId: jest.fn(),
    updateStatus: jest.fn()
  }

  const mockPublisher = {
    publishCreated: jest.fn()
  }

  it('should create and save an appointment, and publish event', async () => {
    const useCase = new CreateAppointment(mockRepo, mockPublisher)

    const input : { insuredId: string, scheduleId: number, countryISO: 'PE' | 'CL' } = { insuredId: '12345', scheduleId: 100, countryISO: 'PE' }

    const result = await useCase.execute(input)

    expect(result).toBeInstanceOf(Appointment)
    expect(result.insuredId).toBe('12345')
    expect(result.scheduleId).toBe(100)
    expect(result.countryISO).toBe('PE')
    expect(result.status).toBe('pending')

    expect(mockRepo.save).toHaveBeenCalledWith(expect.any(Appointment))
    expect(mockPublisher.publishCreated).toHaveBeenCalledWith(expect.any(Appointment))
  })
})
