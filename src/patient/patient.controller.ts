import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Patient, User } from '@prisma/client';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() patient: User): Promise<Patient> {
    return this.patientService.createPatient({ ...patient, role: 'PATIENT' });
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}
