import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import type { Patient, User } from '@prisma/client';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() patient: User): Promise<Patient> {
    return this.patientService.createPatient({
      ...patient,
      role: 'PATIENT',
    });
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Delete(':id')
  async deletePatient(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Patient> {
    return this.patientService.deletePatient(id);
  }
}
