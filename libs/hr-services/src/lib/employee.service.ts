import { Employee, Department, DepartmentHistory } from '@hr-app/shared-types';
import { HttpService } from './http.service';

export class EmployeeService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async getEmployees() {
    return this.httpService.get<Employee[]>('/employees');
  }

  async getEmployee(id: string) {
    return this.httpService.get<Employee>(`/employees/${id}`);
  }

  async createEmployee(employee: Omit<Employee, 'id'>) {
    return this.httpService.post<Employee>('/employees', employee);
  }

  async updateEmployee(id: string, employee: Partial<Employee>) {
    return this.httpService.put<Employee>(`/employees/${id}`, employee);
  }

  async deleteEmployee(id: string) {
    return this.httpService.delete<Employee>(`/employees/${id}`);
  }

  async getDepartmentHistory(id: string) {
    return this.httpService.get<DepartmentHistory[]>(`/employees/${id}/departments-history`);
  }
} 