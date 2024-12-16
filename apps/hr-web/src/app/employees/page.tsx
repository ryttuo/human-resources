'use client';

import { Button, EmployeeCard, Modal, Title } from '@hr-app/hr-ui';
import { useEffect, useState } from 'react';
import { EmployeeService } from '@hr-app/hr-services';
import { useRouter } from 'next/navigation';
import { Employee } from '@hr-app/shared-types';
import { useAppState } from '../context/appStateContext';

export default function EmployeesPage() {
  const router = useRouter();
  const { departments } = useAppState();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const employeeService = new EmployeeService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    first_name: '',
    last_name: '',
    hire_date: new Date() || '',
    department_id: '',
    phone: '',
    address: '',
    status: 'ACTIVE',
    departments: {
      name: '',
    },
  });

  const clearForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      hire_date: new Date(),
      department_id: '',
      phone: '',
      address: '',
      status: '',
      departments: { name: '' },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await employeeService.getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hire_date' ? new Date(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await employeeService.createEmployee({ ...formData, status: 'ACTIVE' });
      setIsModalOpen(false);
      const employeesData = await employeeService.getEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <Title name="Employees" />

      <section>
        <div className="flex flex-col items-end mb-4">
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clearForm();
              setIsModalOpen(true);
            }}
            className="ml-auto"
          >
            New employee
          </Button>
        </div>
        <div className="flex flex-col justify-center gap-4">
          {loading ? (
            // Skeleton loading state
            Array.from({ length: 10 }).map((_, index) => (
              <EmployeeCard
                key={`skeleton-${index}`}
                loading={true}
                employee={{
                  id: '',
                  fullName: '',
                  hireDate: '',
                  department: '',
                  status: 'ACTIVE'
                }}
                onViewDetails={() => {}}
                onDelete={() => {}}
              />
            ))
          ) : (
            employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={{
                  id: employee.id,
                  fullName: `${employee.first_name} ${employee.last_name}`,
                  hireDate: new Date(employee.hire_date).toISOString(),
                  department: employee.departments.name,
                  status: employee.status,
                }}
                onViewDetails={() => {
                  router.push(`/employee/${employee.id}`);
                }}
                onDelete={async () => {
                  const confirmed = window.confirm(
                    `Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`
                  );
                  if (!confirmed) return;

                  try {
                    await employeeService.deleteEmployee(employee.id);
                    const employeesData = await employeeService.getEmployees();
                    setEmployees(employeesData);
                  } catch (error) {
                    console.error('Error deleting employee:', error);
                    alert('Failed to delete employee. Please try again.');
                  }
                }}
              />
            ))
          )}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              required
            />
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              required
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date.toISOString().split('T')[0]}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (XXX) XXX-XXXX"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}"
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
              rows={3}
            />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
