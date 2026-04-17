import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Doctor, User } from '@prisma/client';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async createDoctor(doctor: User): Promise<Doctor> {
    return this.prisma.doctor.create({ data: { user: { create: doctor } } });
  }

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany();
  }
}
