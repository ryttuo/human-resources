import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import {
  employees as Employee,
  departmenthistory as DepartmentHistory,
} from '@prisma/client';

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
        status: data.status,
      },
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return this.prisma.employees.findMany({
      include: {
        departments: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        hire_date: 'desc',
      },
    });
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    return this.prisma.employees.findUnique({
      where: { id },
      include: { departments: { select: { name: true } } },
    });
  }

  async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    return this.prisma.employees.update({ where: { id }, data });
  }

  async deleteEmployee(id: number): Promise<Employee> {
    return this.prisma.employees.delete({ where: { id } });
  }

  async getEmployeeDepartmentHistory(
    id: number
  ): Promise<(DepartmentHistory & { departments: { name: string } })[]> {
    return this.prisma.departmenthistory.findMany({
      where: { employee_id: id },
      orderBy: { changed_at: 'desc' },
      include: {
        departments: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createDepartmentHistory(data: Pick<DepartmentHistory, 'department_id' | 'employee_id'>): Promise<DepartmentHistory> {
    return this.prisma.departmenthistory.create({
      data: {
        department_id: data.department_id,
        employee_id: data.employee_id,
        changed_at: new Date()
      }
    });
  }
}
