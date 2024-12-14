import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { departments as Department } from '@prisma/client';

@Injectable()
export class DepartmentsService {

    constructor(private prisma: PrismaService) {}

    async createDepartment(data: Partial<Department>): Promise<Department> {
        return this.prisma.departments.create({ 
            data: {
                name: data.name
            }
        });
    }

    async getDepartments(): Promise<Department[]> {
        return this.prisma.departments.findMany();
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        return this.prisma.departments.findUnique({ where: { id } });
    }

    async updateDepartment(id: number, data: Partial<Department>): Promise<Department> {
        return this.prisma.departments.update({ where: { id }, data });
    }

    async deleteDepartment(id: number): Promise<Department> {
        return this.prisma.departments.delete({ where: { id } });
    }
}