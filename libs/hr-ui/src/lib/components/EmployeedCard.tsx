import { Button } from './Button';
import { Avatar } from './Avatar';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

interface Employee {
  id: string;
  fullName: string;
  hireDate: string;
  department: string;
  status: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onViewDetails: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onViewDetails, onDelete }) => {
  const hireDate = new Date(employee.hireDate);
  const today = new Date();
  
  const years = differenceInYears(today, hireDate);
  const months = differenceInMonths(today, hireDate) % 12;
  const days = differenceInDays(today, hireDate) % 30;

  const tenure = `${years}y ${months}m ${days}d`;

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <Avatar fullName={employee.fullName} status={employee.status} imageUrl="/imgs/profile.jpeg" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{employee.fullName} <span className="text-sm text-gray-500">({employee.department})</span></h3>
          <div className="mt-1 text-sm text-gray-500">
            <span>Hired: {format(hireDate, 'MMMM d, yyyy')}</span>
            <span className="ml-2">({tenure})</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(employee.id);
            }}
          >
            View Details
          </Button>
          <Button
            variant="secondary" 
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(employee.id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
