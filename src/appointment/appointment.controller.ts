import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  AppointmentService,
  type AppointmentWithRelations,
  type CreateAppointmentInput,
} from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() body: CreateAppointmentInput) {
    return this.appointmentService.create(body);
  }

  @Get()
  async findAll(): Promise<AppointmentWithRelations[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AppointmentWithRelations> {
    const appointment = await this.appointmentService.findOne(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }
    return appointment;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AppointmentWithRelations> {
    return this.appointmentService.delete(id);
  }
}
