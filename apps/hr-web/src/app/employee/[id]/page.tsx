'use client';

import { useEffect, useState } from 'react';
import { ApiService } from '@hr-app/hr-services';
import { Button, Avatar, Title } from '@hr-app/hr-ui';
import { useRouter } from 'next/navigation';
import { Employee, Department, DepartmentHistory } from '@hr-app/shared-types';
import { format } from 'date-fns';

export default function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentHistory, setDepartmentHistory] = useState<
    DepartmentHistory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const apiService = new ApiService();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeData, departmentsData, historyData] = await Promise.all([
          apiService.getEmployee(id),
          apiService.getDepartments(),
          apiService.getDepartmentHistory(id),
        ]);

        setEmployee(employeeData);
        setSelectedDepartment(employeeData.department_id);
        setDepartments(departmentsData);
        setDepartmentHistory(historyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDepartmentUpdate = async () => {
    if (!employee || selectedDepartment === employee.department_id) return;

    try {
      const updatedEmployee = await apiService.updateEmployee(id, {
        department_id: selectedDepartment,
      });
      const newHistory = await apiService.getDepartmentHistory(id);

      setEmployee(updatedEmployee);
      setDepartmentHistory(newHistory);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleStatusUpdate = async () => {
    if (!employee) return;

    try {
      const newStatus = employee.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      const updatedEmployee = await apiService.updateEmployee(id, {
        status: newStatus,
      });
      setEmployee(updatedEmployee);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleBack = () => {
    router.push('/employees');
  };

  return (
    <div>
      <Title name="Employee Details" />

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="relative">
            <Button
              variant={employee.status === 'ACTIVE' ? 'secondary' : 'primary'}
              onClick={handleStatusUpdate}
            >
              {employee.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Avatar
            fullName={employee.first_name}
            status={employee.status}
            imageUrl="/imgs/profile.jpeg"
          />
          <div>
            <p className="font-medium">Name</p>
            <p>
              {employee.first_name} {employee.last_name}
            </p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>{employee.phone}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p>{employee.address}</p>
          </div>
          <div>
            <p className="font-medium">Hire Date</p>
            <p>
              {format(new Date(employee.hire_date).toLocaleDateString('en-US', { timeZone: 'GMT' }), 'MMMM d, yyyy')}
            </p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p>{employee.status}</p>
          </div>
          <div>
            <p className="font-medium">Current Department</p>
            <div className="flex gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border rounded px-2 py-1"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                onClick={handleDepartmentUpdate}
                className={`${
                  selectedDepartment === employee.department_id
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={selectedDepartment === employee.department_id}
              >
                Update
              </Button>
            </div>
          </div>
          <div className="mt-2 flex justify-end items-center">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Department History</h2>
        <div className="space-y-4">
          {departmentHistory.map((history, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">{history.departments.name}</p>
              <p className="text-sm text-gray-600">
                From: {new Date(history.changed_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
