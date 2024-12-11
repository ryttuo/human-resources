import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { employees as Employee } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() data: Partial<Employee>): Promise<Employee> {
    return this.employeesService.createEmployee(data);
  }

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee | null> {
    return this.employeesService.getEmployeeById(+id);
  }

  @Put(':id')
  async updateEmployee(@Param('id') id: number, @Body() data: Partial<Employee>): Promise<Employee> {
    return this.employeesService.updateEmployee(+id, data);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<Employee> {
    return this.employeesService.deleteEmployee(+id);
  }

  @Get(':id/departments-history')
  async getEmployeeDepartmentsHistory(@Param('id') id: number) {
    return this.employeesService.getEmployeeDepartmentHistory(+id);
  }
}
