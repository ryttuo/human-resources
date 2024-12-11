import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { employees as Employee } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    return this.prisma.employees.create({ 
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        hire_date: data.hire_date,
        department_id: data.department_id,
        phone: data.phone,
        address: data.address,
        status: data.status
      }
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return this.prisma.employees.findMany();
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    return this.prisma.employees.findUnique({ where: { id } });
  }

  async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    return this.prisma.employees.update({ where: { id }, data });
  }

  async deleteEmployee(id: number): Promise<Employee> {
    return this.prisma.employees.delete({ where: { id } });
  }
}
