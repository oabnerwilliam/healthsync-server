import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Admin, User } from '@prisma/client';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() admin: User): Promise<Admin> {
    return this.adminService.createAdmin({ ...admin, role: 'ADMIN' });
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
}
