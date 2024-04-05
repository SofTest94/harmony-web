'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type TableColumn = {
  Header: string;
  accessor?: string;
};

type TableRow = {
  [key: string]: string | number;
};

type TableProps = {
  columns: TableColumn[];
  data: TableRow[] | any[];
  handleEmployeeSelectionChange?: (employeeId: string) => void;
  toggleAllEmployeesSelection?: () => void;
  selectedEmployees?: string[];
  linkTr?: string;
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  handleEmployeeSelectionChange,
  toggleAllEmployeesSelection,
  selectedEmployees,
  linkTr,
}) => {
  const router = useRouter();
  return (
    <table className="table">
      <thead className="thead">
        <tr className="tr-head">
          {columns.map((column, index) => (
            <th className="th" key={index}>
              {column.Header}
            </th>
          ))}
          {handleEmployeeSelectionChange && (
            <th className="th">
              <input
                type="checkbox"
                checked={selectedEmployees?.length === data.length}
                onChange={toggleAllEmployeesSelection}
              />
            </th>
          )}
        </tr>
      </thead>
      <tbody className="tbody">
        {data &&
          data.map((row, rowIndex) => (
            <tr
              className="tr-tbody"
              key={rowIndex}
              onClick={() => {
                linkTr! && router.push(linkTr + row['_id']);
              }}
            >
              {columns.map((column, colIndex) => (
                <td className="td" key={colIndex}>
                  {column.accessor ? row[column.accessor] : ''}
                </td>
              ))}
              {handleEmployeeSelectionChange && (
                <td className="td">
                  <input
                    type="checkbox"
                    checked={selectedEmployees?.includes(row._id)}
                    onChange={() =>
                      handleEmployeeSelectionChange(row._id as string)
                    }
                  />
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
