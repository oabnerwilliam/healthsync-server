import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import type { Doctor, User } from '@prisma/client';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async createDoctor(@Body() doctor: User): Promise<Doctor> {
    return this.doctorService.createDoctor({ ...doctor, role: 'DOCTOR' });
  }

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }
}
