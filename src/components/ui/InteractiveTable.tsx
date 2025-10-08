'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TextInput,
  Button
} from '@tremor/react';
import { useState, useMemo } from 'react';

/**
 * @interface InteractiveTableProps
 * @template T
 * @property {T[]} data - The data to be displayed in the table.
 * @property {Array<{ header: string; accessor: keyof T }>} columns - The columns to be displayed in the table.
 * @property {number} [rowsPerPage=10] - The number of rows to display per page.
 */
interface InteractiveTableProps<T> {
  data: T[];
  columns: Array<{ header: string; accessor: keyof T; }>;
  rowsPerPage?: number;
}

/**
 * A reusable table component with filtering, sorting, and pagination capabilities.
 * @template T
 * @param {InteractiveTableProps<T>} props - The props for the component.
 * @returns {JSX.Element}
 */
export function InteractiveTable<T>({ data, columns, rowsPerPage = 10 }: InteractiveTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((column) => {
        const value = item[column.accessor];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.accessor.toString()} onClick={() => requestSort(column.accessor)}>
                {column.header}
                {sortConfig && sortConfig.key === column.accessor ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : null}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.accessor.toString()}>{String(item[column.accessor])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <p>Page {currentPage} of {totalPages}</p>
        <div>
          <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
        </div>
      </div>
    </div>
  );
}