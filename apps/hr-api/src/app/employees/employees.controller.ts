import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { employees as Employee } from '@prisma/client';
import { CreateEmployeeDto } from './employees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  createEmployee(@Body() data: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.createEmployee(data);
  }

  @Get()
  getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeesService.getEmployeeById(+id);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number, 
    @Body() data: Partial<Employee>
  ): Promise<Employee> {
    const employee = await this.employeesService.updateEmployee(+id, data);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeesService.deleteEmployee(+id);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  @Get(':id/departments-history')
  async getEmployeeDepartmentsHistory(@Param('id') id: number) {
    const history = await this.employeesService.getEmployeeDepartmentHistory(+id);
    if (!history.length) {
      throw new HttpException('No department history found', HttpStatus.NOT_FOUND);
    }
    return history;
  }
}
