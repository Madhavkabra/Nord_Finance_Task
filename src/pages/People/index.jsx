import React, { useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';
import { TableToolbar } from '../../components/TableToolbar';
import { Table } from '../../components/Table';
import { TableFooter } from '../../components/TableFooter';
import { TableContainer } from '../../components/TableContainer';
import { API_BASE_URL } from '../../config';
import { columns } from './columns';

const maniputatePeopleApiRes = (people) => {
  return people.map((person, index) => ({
    id: person.url,
    data: [
      {
        label: `${index + 1}`,
      },
      {
        label: person.name,
      },
      {
        label: person.gender,
      },
      {
        label: person.birth_year,
      },
      {
        label: person.eye_color,
      },
      {
        label: person.hair_color,
      },
      {
        label: person.skin_color,
      },
      {
        label: person.height,
      },
      {
        label: person.mass,
      },
      {
        label: person.species.length,
      },
      {
        label: person.films.length,
      },
      {
        label: person.starships.length,
      },
      {
        label: person.vehicles.length,
      },
    ],
  }));
};

export const People = () => {
  const [searchedName, setSearchedName] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('/api/people/');
  const [page, setPage] = useState(1);

  const { data } = useSWR(apiEndpoint, async () => {
    const res = await fetch(`${API_BASE_URL}${apiEndpoint}`);
    const data = await res.json();

    return { ...data, results: maniputatePeopleApiRes(data.results) };
  });

  const handleSearchNameChange = (event) => {
    setSearchedName(event.target.value);
  };

  const handleNextButtonClick = () => {
    setApiEndpoint(`/api/people/?page=${page + 1}`);
    setPage((page) => page + 1);
  };

  const handlePreviousButtonClick = () => {
    setApiEndpoint(`/api/people/?page=${page - 1}`);
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
          onChangeInput={handleSearchNameChange}
        />

        {/* Table */}
        <Table
          columns={columns}
          rows={data?.results || []}
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
