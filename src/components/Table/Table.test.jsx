import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Table } from '.';

const columns = [
  { id: 'name', label: 'Name', sort: true },
  { id: 'age', label: 'Age', sort: false },
];

const rows = [
  {
    id: '1',
    data: [
      { id: 'name', label: 'John' },
      { id: 'age', label: 25 },
    ],
  },
  {
    id: '2',
    data: [
      { id: 'name', label: 'Jane' },
      { id: 'age', label: 30 },
    ],
  },
];

const searchedName = 'John';
const isError = false;
const isLoading = false;

describe('Table component', () => {
  test('Should render table columns correctly', () => {
    const { getByText } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    columns.forEach((column) => {
      const columnHeader = getByText(column.label);
      expect(columnHeader).toBeInTheDocument();
    });
  });

  test('Should render table rows correctly', () => {
    const { getByText } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    rows.forEach((row) => {
      row.data.forEach((rowData) => {
        const cellData = getByText(rowData.label);
        expect(cellData).toBeInTheDocument();
      });
    });
  });

  test('Should sort table rows in ascending order by default', () => {
    const { getByTestId } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    const firstRowNameCell = getByTestId('table-body').firstChild.textContent;
    expect(firstRowNameCell.includes('Jane')).toBeTruthy();
  });

  test('Should sort table rows in descending order when clicked on column header', () => {
    const { getByText, getByTestId } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    const nameColumnHeader = getByText('Name');
    fireEvent.click(nameColumnHeader);

    const firstRowNameCell = getByTestId('table-body').firstChild.textContent;
    expect(firstRowNameCell.includes('John')).toBeTruthy();
  });

  test('Should sort table rows in ascending order when double clicked on column header', () => {
    const { getByText, getByTestId } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    const nameColumnHeader = getByText('Name');
    fireEvent.click(nameColumnHeader);

    const firstRowNameCell = getByTestId('table-body').firstChild.textContent;
    expect(firstRowNameCell.includes('John')).toBeTruthy();

    // Double click
    fireEvent.click(nameColumnHeader);

    const firstRowNameCellAfterDoubleClick =
      getByTestId('table-body').firstChild.textContent;
    expect(firstRowNameCellAfterDoubleClick.includes('Jane')).toBeTruthy();
  });

  test('Should reset sorting order when search query change', () => {
    const { getByText, getByTestId, rerender } = render(
      <Table
        columns={columns}
        rows={rows}
        searchedName={searchedName}
        isError={isError}
        isLoading={isLoading}
      />
    );

    const nameColumnHeader = getByText('Name');
    fireEvent.click(nameColumnHeader);

    const firstRowNameCell = getByTestId('table-body').firstChild.textContent;
    expect(firstRowNameCell.includes('John')).toBeTruthy();

    rerender(
      <Table
        columns={columns}
        rows={rows}
        searchedName={'test'}
        isError={isError}
        isLoading={isLoading}
      />
    );
  });
});
