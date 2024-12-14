import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  hire_date: Date;
  department_id: string;
  phone: string;
  address: string;
  status: string;
  departments: {
    name: string;
  };
}

export interface Department {
  id: string;
  name: string;
}

export interface DepartmentHistory {
  id: string;
  department_id: string;
  name: string;
  changed_at: Date;
  departments: {
    name: string;
  };
}

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4000/api',
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  async getEmployees() {
    return this.get<Employee[]>('/employees');
  }

  async getEmployee(id: string) {
    return this.get<Employee>(`/employees/${id}`);
  }

  async createEmployee(employee: Omit<Employee, 'id'>) {
    return this.post<Employee>('/employees', employee);
  }

  async updateEmployee(id: string, employee: Partial<Employee>) {
    return this.put<Employee>(`/employees/${id}`, employee);
  }

  async deleteEmployee(id: string) {
    return this.delete<Employee>(`/employees/${id}`);
  }

  async getDepartments() {
    return this.get<Department[]>('/departments');
  }

  async getDepartmentHistory(id: string) {
    return this.get<DepartmentHistory[]>(`/employees/${id}/departments-history`);
  }
}
