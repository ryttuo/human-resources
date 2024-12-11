import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { departments as Department } from '@prisma/client';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Post()
    async createDepartment(@Body() data: Partial<Department>): Promise<Department> {
        return this.departmentsService.createDepartment(data);
    }

    @Get()
    async getDepartments(): Promise<Department[]> {
        return this.departmentsService.getDepartments();
    }

    @Get(':id')
    async getDepartmentById(@Param('id') id: number): Promise<Department | null> {
        return this.departmentsService.getDepartmentById(+id);
    }

    @Put(':id')
    async updateDepartment(@Param('id') id: number, @Body() data: Partial<Department>): Promise<Department> {
        return this.departmentsService.updateDepartment(+id, data);
    }

    @Delete(':id')
    async deleteDepartment(@Param('id') id: number): Promise<Department> {
        return this.departmentsService.deleteDepartment(+id);
    }
}