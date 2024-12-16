import { Department } from '@hr-app/shared-types';
import { HttpService } from './http.service';

export class DepartmentsService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async createDepartment(department: Partial<Department>) {
    return this.httpService.post<Department>('/departments', department);
  }

  async getDepartments() {
    return this.httpService.get<Department[]>('/departments');
  }

  async getDepartmentById(id: number) {
    return this.httpService.get<Department>(`/departments/${id}`);
  }

  async updateDepartment(id: number, department: Partial<Department>) {
    return this.httpService.put<Department>(`/departments/${id}`, department);
  }

  async deleteDepartment(id: number) {
    return this.httpService.delete<Department>(`/departments/${id}`);
  }
}
