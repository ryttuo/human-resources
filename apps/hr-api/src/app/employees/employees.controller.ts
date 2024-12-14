import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { employees as Employee } from '@prisma/client';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() data: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.employeesService.createEmployee(data);
    await this.employeesService.createDepartmentHistory({
      department_id: employee.department_id,
      employee_id: employee.id
    });
    return employee;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() data: UpdateEmployeeDto
  ): Promise<Employee> {
    const employee = await this.employeesService.updateEmployee(+id, data);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    if (data.department_id) {
      await this.employeesService.createDepartmentHistory({
        department_id: data.department_id,
        employee_id: employee.id
      });
    }
    return employee;
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
