import React, { useState } from 'react';
import styles from './styles.module.css';
import { TableToolbar } from '../../components/TableToolbar';
import { Table } from '../../components/Table';
import { TableFooter } from '../../components/TableFooter';
import { TableContainer } from '../../components/TableContainer';

const columns = [
  {
    label: 'Sr No',
    width: '',
  },
  {
    label: 'Name',
    width: '',
  },
  {
    label: 'Email',
    width: '',
  },
  {
    label: 'Phone',
    width: '',
  },
  {
    label: 'Address',
    width: '',
  },
];

const rows = [
  {
    id: '01',
    data: [
      { label: '01' },
      { label: 'Madhav' },
      { label: '564654564' },
      { label: 'madhav@gmail.com' },
      { label: 'Indore' },
    ],
  },
  {
    id: '02',
    data: [
      { label: '02' },
      { label: 'Madhav K' },
      { label: '68535664564' },
      { label: 'madhavK@gmail.com' },
      { label: 'Indore MP' },
    ],
  },
];

export const People = () => {
  const [searchedName, setSearchedName] = useState('');

  const handleSearchNameChange = (event) => {
    setSearchedName(event.target.value);
  };

  return (
    <div className={styles.peopleContainer}>
      <TableContainer>
        {/* Table toolbar */}
        <TableToolbar
          showInput
          title='Star Wars'
          inputName='starWarName'
          inputPlaceholder='Search Name...'
          inputValue={searchedName}
          onChangeInput={handleSearchNameChange}
        />

        {/* Table */}
        <Table
          columns={columns}
          rows={rows}
        />

        {/* Table footer */}
        <TableFooter
          currentPage={0}
          onNext={null}
          onPrevious={null}
        />
      </TableContainer>
    </div>
  );
};
