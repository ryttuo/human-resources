'use client';

import { Button } from '@hr-app/hr-ui';

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
      </section>
    </div>
  );
}
