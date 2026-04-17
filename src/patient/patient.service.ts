import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, User } from '@prisma/client';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async createPatient(patient: User): Promise<Patient> {
    return this.prisma.patient.create({ data: { user: { create: patient } } });
  }

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
  }
}
