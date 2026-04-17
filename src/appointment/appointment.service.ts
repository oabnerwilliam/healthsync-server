import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const appointmentWithRelations = {
  doctor: { include: { user: true } },
  patient: { include: { user: true } },
} satisfies Prisma.AppointmentInclude;

export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: typeof appointmentWithRelations;
}>;

export type CreateAppointmentInput = {
  doctorId: string;
  patientId: string;
  date: string | Date;
};

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentInput) {
    const date = typeof data.date === 'string' ? new Date(data.date) : data.date;
    return this.prisma.appointment.create({
      data: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        date,
      },
      include: appointmentWithRelations,
    });
  }

  async findAll(): Promise<AppointmentWithRelations[]> {
    return this.prisma.appointment.findMany({
      include: appointmentWithRelations,
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: string): Promise<AppointmentWithRelations | null> {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: appointmentWithRelations,
    });
  }
}
