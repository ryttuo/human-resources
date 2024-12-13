import Button from './Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

interface Employee {
  id: string;
  fullName: string;
  imageUrl: string;
  hireDate: string;
  department: string;
}

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const router = useRouter();
  const hireDate = new Date(employee.hireDate);
  const today = new Date();
  
  const years = differenceInYears(today, hireDate);
  const months = differenceInMonths(today, hireDate) % 12;
  const days = differenceInDays(today, hireDate) % 30;

  const tenure = `${years}y ${months}m ${days}d`;

  const handleClick = (e: React.MouseEvent) => {
    router.push(`/employee/${employee.id}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16">
          <Image
            src={employee.imageUrl}
            alt={employee.fullName}
            fill
            sizes="(max-width: 64px) 100vw, 64px"
            className="rounded-full object-cover"
          />
        </div>
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
            onClick={handleClick}
          >
            View Details
          </Button>
          <Button
            variant="secondary" 
            className="mt-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle close action
              console.log('Delete clicked');
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
