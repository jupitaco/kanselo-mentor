import Skeleton from '../skeleton/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { cn } from '@/libs/utils';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  containerClassName?: string;
  className?: string;
}

export default function TableSkeleton({
  columns = 5,
  rows = 5,
  containerClassName,
  className,
}: TableSkeletonProps) {
  return (
    <Table
      containerClassName={cn(
        'overflow-auto mt-8',
        containerClassName,
      )}
      className={className}
    >
      <TableHeader className="bg-primary text-white border-gray-200 border-t">
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableHead key={index} className="text-sm whitespace-nowrap bg-white">
              <Skeleton className="h-4!  w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className="py-5">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[150px]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}