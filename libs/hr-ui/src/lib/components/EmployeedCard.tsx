import { Button } from './Button';
import { Avatar } from './Avatar';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import Skeleton from 'react-loading-skeleton';

interface Employee {
  id: string;
  fullName: string;
  hireDate: string;
  department: string;
  status: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onViewDetails?: (id: string) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onViewDetails, onDelete, loading = false }) => {
  const hireDate = new Date(employee.hireDate);
  const today = new Date();
  
  const years = differenceInYears(today, hireDate);
  const months = differenceInMonths(today, hireDate) % 12;
  const days = differenceInDays(today, hireDate) % 30;

  const tenure = `${years}y ${months}m ${days}d`;

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        {loading ? (
          <Skeleton circle width={64} height={64} />
        ) : (
          <Avatar fullName={employee.fullName} status={employee.status} imageUrl="/imgs/profile.jpeg" />
        )}
        <div className="flex-1">
          {loading ? (
            <>
              <Skeleton width={200} height={24} />
              <Skeleton width={150} height={20} />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">{employee.fullName} <span className="text-sm text-gray-500">({employee.department})</span></h3>
              <div className="mt-1 text-sm text-gray-500">
                <span>Hired: {format(new Date(hireDate).toLocaleDateString('en-US', { timeZone: 'GMT' }), 'MMMM d, yyyy')}</span>
                <span className="ml-2">({tenure})</span>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {loading ? (
            <>
              <Skeleton width={100} height={35} />
              <Skeleton width={100} height={35} />
            </>
          ) : (
            <>
              <Button
                variant="primary"
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.(employee.id);
                }}
              >
                View Details
              </Button>
              <Button
                variant="secondary" 
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(employee.id);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
