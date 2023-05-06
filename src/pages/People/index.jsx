import React, { useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';
import { TableToolbar } from '../../components/TableToolbar';
import { Table } from '../../components/Table';
import { TableFooter } from '../../components/TableFooter';
import { TableContainer } from '../../components/TableContainer';
import { columns } from './columns';
import { debounce } from '../../utils/debounce';
import { peopleFetcher } from './peopleFetcher';

export const People = () => {
  const [searchedName, setSearchedName] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('/api/people/');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useSWR(apiEndpoint, peopleFetcher);

  const updateSearchEndpoint = debounce((name) => {
    setPage(1);
    setApiEndpoint(`/api/people/?search=${name}`);
  });

  const handleNameChange = (event) => {
    const { value } = event.target;

    setSearchedName(value);
    updateSearchEndpoint(value);
  };

  const handleNextButtonClick = () => {
    if (searchedName) {
      setApiEndpoint(`/api/people/?page=${page + 1}&search=${searchedName}`);
    } else {
      setApiEndpoint(`/api/people/?page=${page + 1}`);
    }

    setPage((page) => page + 1);
  };

  const handlePreviousButtonClick = () => {
    if (searchedName) {
      setApiEndpoint(`/api/people/?page=${page - 1}&search=${searchedName}`);
    } else {
      setApiEndpoint(`/api/people/?page=${page - 1}`);
    }

    setPage((page) => page - 1);
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
          onChangeInput={handleNameChange}
        />

        {/* Table */}
        <Table
          searchedName={searchedName}
          columns={columns}
          rows={data?.results || []}
          isError={Boolean(error)}
          isLoading={isLoading}
        />

        {/* Table footer */}
        <TableFooter
          currentPage={page}
          disabledNext={!data?.next}
          disabledPrevious={!data?.previous}
          onNext={handleNextButtonClick}
          onPrevious={handlePreviousButtonClick}
        />
      </TableContainer>
    </div>
  );
};
