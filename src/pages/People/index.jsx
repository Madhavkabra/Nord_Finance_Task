import React, { useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';
import { TableToolbar } from '../../components/TableToolbar';
import { Table } from '../../components/Table';
import { TableFooter } from '../../components/TableFooter';
import { TableContainer } from '../../components/TableContainer';
import { API_BASE_URL } from '../../config';
import { columns } from './columns';
import { debounce } from '../../utils/debounce';

const maniputatePeopleApiRes = (people) => {
  return people.map((person) => ({
    id: person.url,
    data: [
      {
        id: 'name',
        label: person.name,
      },
      {
        id: 'gender',
        label: person.gender,
      },
      {
        id: 'birthYear',
        label: person.birth_year,
      },
      {
        id: 'eyeColor',
        label: person.eye_color,
      },
      {
        id: 'hairColor',
        label: person.hair_color,
      },
      {
        id: 'skinColor',
        label: person.skin_color,
      },
      {
        id: 'height',
        label: person.height,
      },
      {
        id: 'mass',
        label: person.mass,
      },
      {
        id: 'species',
        label: person.species.length,
      },
      {
        id: 'films',
        label: person.films.length,
      },
      {
        id: 'starships',
        label: person.starships.length,
      },
      {
        id: 'vehicles',
        label: person.vehicles.length,
      },
    ],
  }));
};

export const People = () => {
  const [searchedName, setSearchedName] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('/api/people/');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useSWR(apiEndpoint, async () => {
    const res = await fetch(`${API_BASE_URL}${apiEndpoint}`);
    const data = await res.json();

    return { ...data, results: maniputatePeopleApiRes(data.results) };
  });

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
