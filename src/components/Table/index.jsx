import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';
import { useLoader } from '../../hooks/useLoader';

const ASC_ORDER = 'asc';
const DESC_ORDER = 'desc';

export const Table = ({ columns, rows, searchedName, isError, isLoading }) => {
  const [rowsData, setRowsData] = useState(rows);
  const [order, setOrder] = useState(ASC_ORDER);

  const isAsc = order === ASC_ORDER;

  const loader = useLoader({
    data: Object.keys(rows.length || 0),
    isError: isError,
    isLoading: isLoading,
  });

  const findDataById = (options, id) => {
    return options.find((option) => option.id === id);
  };

  const sortData = useCallback(
    (id) => {
      const sortedRows = [...rows].sort((first, second) => {
        const a = findDataById(second.data, id)['label'];
        const b = findDataById(first.data, id)['label'];

        if (a > b) {
          return isAsc ? -1 : 1;
        }

        if (a < b) {
          return isAsc ? 1 : -1;
        }

        return 0;
      });

      setRowsData(sortedRows);
    },
    [isAsc, rows]
  );

  const handleClickOnColumnHead = () => {
    if (order === ASC_ORDER) {
      setOrder(DESC_ORDER);
      return;
    }

    setOrder(ASC_ORDER);
  };

  useEffect(() => {
    if (order !== ASC_ORDER) {
      setOrder(ASC_ORDER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedName]);

  useEffect(() => {
    sortData('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, order]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th
              key={`${columnIndex}-${column.label}`}
              width={column?.width || `${100 / columns.length}%`}
              onClick={() => column?.sort && handleClickOnColumnHead(column.id)}
            >
              {column.label}

              {column?.sort && (
                <i
                  className={cx('fa-solid fa-arrow-up', {
                    [styles.orderIconRotate]: !isAsc,
                  })}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody data-testid='table-body'>
        {loader && (
          <tr>
            <td
              colSpan={'100%'}
              className={styles.loader}
            >
              {loader}
            </td>
          </tr>
        )}

        {!loader &&
          rowsData.map((row, rowIndex) => (
            <tr
              key={`${rowIndex}-${row?.id}`}
              data-testid={`table-row-${rowIndex}`}
            >
              {row?.data?.map((rowData, rowDataIndex) => (
                <td key={`${rowDataIndex}-${rowData.label}`}>
                  {rowData.label}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  searchedName: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.element,
          ]),
        })
      ),
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sort: PropTypes.bool,
      width: PropTypes.string,
    })
  ),
};

Table.defaultProps = {
  columns: [],
  rows: [],
};
