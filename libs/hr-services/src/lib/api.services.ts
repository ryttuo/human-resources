import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  hire_date: string;
  departments: {
    name: string;
  };
}

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:4000/api',
    });
  }

  // Example GET method
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  // Example POST method
  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
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
    const response = await this.axiosInstance.put<Employee>(
      `/employees/${id}`,
      employee
    );
    return response.data;
  }

  async deleteEmployee(id: string) {
    const response = await this.axiosInstance.delete(`/employees/${id}`);
    return response.data;
  }
}
