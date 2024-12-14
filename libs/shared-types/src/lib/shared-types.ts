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

export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  hire_date: Date;
  department_id: string;
  phone: string;
  address: string;
  status: string;
}