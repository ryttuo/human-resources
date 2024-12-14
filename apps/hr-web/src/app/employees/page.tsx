'use client';

import { Button, EmployeeCard, Modal } from '@hr-app/hr-ui';
import { useEffect, useState } from 'react';
import { ApiService, Employee, Department } from '@hr-app/hr-services';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const apiService = new ApiService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    first_name: '',
    last_name: '',
    hire_date: new Date() || '',
    department_id: '',
    phone: '',
    address: '',
    status: '',
    departments: {
      name: ''
    }
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  const clearForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      hire_date: new Date(),
      department_id: '',
      phone: '',
      address: '',
      status: '',
      departments: { name: '' }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesData, departmentsData] = await Promise.all([
          apiService.getEmployees(),
          apiService.getDepartments()
        ]);
        setEmployees(employeesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hire_date' ? new Date(value) : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await apiService.createEmployee(formData);
      setIsModalOpen(false);
      const employeesData = await apiService.getEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

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
              clearForm();
              setIsModalOpen(true);
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
                hireDate: new Date(employee.hire_date).toISOString(),
                department: employee.departments.name
              }}
            />
          ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        
        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
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
            <Button
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>


    </div>
  );
}
