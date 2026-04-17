import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Admin, User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(admin: User): Promise<Admin> {
    return this.prisma.admin.create({ data: { user: { create: admin } } });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany({ include: { user: true } });
  }
}
