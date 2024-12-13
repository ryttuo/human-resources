'use client';

import { Button } from '@hr-app/hr-ui';
import { EmployeeCard } from '@hr-app/hr-ui';
import { useEffect, useState } from 'react';
import { ApiService, Employee } from '@hr-app/hr-services';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const apiService = new ApiService('http://localhost:4000/api');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await apiService.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold mt-4 uppercase text-xl">Employees</h1>
      <section>
        <div className="flex flex-col items-end pr-4">
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('clicked');
            }}
            className="ml-auto"
          >
            New employee
          </Button>
        </div>
        <div className="flex flex-col justify-center p-4 gap-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={{
                id: employee.id,
                fullName: `${employee.first_name} ${employee.last_name}`,
                imageUrl: "/imgs/profile.jpeg",
                hireDate: employee.hire_date,
                department: employee.departments.name
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
