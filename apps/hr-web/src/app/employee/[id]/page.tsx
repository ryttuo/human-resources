'use client';

import { useEffect, useState } from 'react';
import { ApiService } from '@hr-app/hr-services';
import { Button, Avatar, Title } from '@hr-app/hr-ui';
import { useRouter } from 'next/navigation';
import { Employee, DepartmentHistory } from '@hr-app/shared-types';
import { format } from 'date-fns';
import { useAppState } from '../../context/appStateContext';
import Skeleton from 'react-loading-skeleton';

export default function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { departments } = useAppState();
  const [employee, setEmployee] = useState<Employee | null>(null);
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
        const [employeeData, historyData] = await Promise.all([
          apiService.getEmployee(id),
          apiService.getDepartmentHistory(id),
        ]);

        setEmployee(employeeData);
        setSelectedDepartment(employeeData.department_id);
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

  const handleBack = () => {
    router.push('/employees');
  };

  if (!employee && !loading) {
    return <div>Employee not found</div>;
  }

  return (
    <div>
      <Title name="Employee Details" />

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="relative">
            {loading ? (
              <Skeleton width={100} height={35} />
            ) : (
              <Button
                variant={employee?.status === 'ACTIVE' ? 'secondary' : 'primary'}
                onClick={handleStatusUpdate}
              >
                {employee?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <Skeleton circle width={80} height={80} />
          ) : (
            <Avatar
              fullName={employee?.first_name || ''}
              status={employee?.status || 'INACTIVE'}
              imageUrl="/imgs/profile.jpeg"
            />
          )}
          <div>
            <p className="font-medium">Name</p>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <p>
                {employee?.first_name} {employee?.last_name}
              </p>
            )}
          </div>
          <div>
            <p className="font-medium">Phone</p>
            {loading ? <Skeleton width={120} /> : <p>{employee?.phone}</p>}
          </div>
          <div>
            <p className="font-medium">Address</p>
            {loading ? <Skeleton width={200} /> : <p>{employee?.address}</p>}
          </div>
          <div>
            <p className="font-medium">Hire Date</p>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <p>
                {format(new Date(employee?.hire_date || '').toLocaleDateString('en-US', { timeZone: 'GMT' }), 'MMMM d, yyyy')}
              </p>
            )}
          </div>
          <div>
            <p className="font-medium">Status</p>
            {loading ? <Skeleton width={80} /> : <p>{employee?.status}</p>}
          </div>
          <div>
            <p className="font-medium">Current Department</p>
            {loading ? (
              <div className="flex gap-2">
                <Skeleton width={120} height={35} />
                <Skeleton width={80} height={35} />
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="primary"
                  onClick={handleDepartmentUpdate}
                  className={`${
                    selectedDepartment === employee?.department_id
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={selectedDepartment === employee?.department_id}
                >
                  Update
                </Button>
              </div>
            )}
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
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-b pb-2">
                <Skeleton width={150} className="mb-2" />
                <Skeleton width={200} />
              </div>
            ))
          ) : (
            departmentHistory.map((history, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-medium">{history.departments.name}</p>
                <p className="text-sm text-gray-600">
                  From: {new Date(history.changed_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
