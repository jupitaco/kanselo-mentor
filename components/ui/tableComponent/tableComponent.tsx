import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "@/libs/utils";

export interface Column<T> {
  title: string;
  key: keyof T;
  render?: (value: T[keyof T], record: T) => ReactNode;
  headerClassName?: string;
  columnClassName?: string;
  cellClassName?: string;
  noMobile?: true;
}

export interface TableComponentProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  className?: string;
  containerClassName?: string;
  path?: string;
  handleRowClick?: (row: T) => void;
}

export default function TableComponent<T extends Record<string, any>>(
  props: TableComponentProps<T>,
) {
  const {
    title,
    columns,
    data,
    className,
    containerClassName,
    handleRowClick,
  } = props;

  return (
    <Table
      containerClassName={containerClassName}
      className={` ${className ? className : ""}`}
    >
      {title && <TableCaption className="sr-only">{title}</TableCaption>}

      <TableHeader className="border-grey-200 border-t">
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className={cn(
                "text-grey-300 text-sm whitespace-nowrap",
                column?.noMobile ? "hidden lg:table-cell" : "",
              )}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={row.id || rowIndex}
            onClick={() => handleRowClick && handleRowClick(row)}
          >
            {columns.map((column) => {
              return (
                <TableCell
                  key={`${rowIndex}-${column.key.toString()}`}
                  className={cn(
                    "py-5 font-medium whitespace-break-spaces",
                    column?.noMobile ? "hidden lg:table-cell" : "",
                    handleRowClick ? "cursor-pointer" : "",
                    column.cellClassName,
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
