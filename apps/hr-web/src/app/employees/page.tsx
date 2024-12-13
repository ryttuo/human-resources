'use client';

import { Button } from '@hr-app/hr-ui';
import { EmployeeCard } from '@hr-app/hr-ui';

export default function EmployeesPage() {
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
            <EmployeeCard employee={{
                id: "1",
                fullName: "John Doe",
                imageUrl: "",
                hireDate: "2023-01-15"
            }} />

<EmployeeCard employee={{
                id: "1",
                fullName: "Noah Solano",
                imageUrl: "",
                hireDate: "2022-01-15"
            }} />
        </div>
      </section>
    </div>
  );
}
