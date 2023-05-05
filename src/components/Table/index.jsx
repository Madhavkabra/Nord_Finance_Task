import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { debounce } from '../../utils/debounce';
import styles from './styles.module.css';

export const Table = ({ columns, rows, searchedName }) => {
  const [rowsData, setRowsData] = useState(rows);
  const [order, setOrder] = useState('asc');

  const isAsc = order === 'asc';

  const findDataById = (options, id) => {
    return options.find((option) => option.id === id);
  };

  const toggleOrder = useCallback(() => {
    if (order === 'asc') {
      setOrder('desc');
      return;
    }

    setOrder('asc');
  }, [order]);

  const sortData = useCallback(
    (id) => {
      const sortedRows = [...rows].sort((first, second) => {
        const a = findDataById(second.data, id)['label'];
        const b = findDataById(first.data, id)['label'];

        if (typeof a === 'string') {
          if (a > b) {
            return isAsc ? 1 : -1;
          }

          if (a < b) {
            return isAsc ? -1 : 1;
          }

          return 0;
        }

        return isAsc ? a - b : b - a;
      });

      setRowsData(sortedRows);
      toggleOrder();
    },
    [isAsc, rows, toggleOrder]
  );

  useEffect(() => {
    debounce(setOrder('asc'));
  }, [searchedName]);

  useEffect(() => {
    sortData('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th
              key={`${columnIndex}-${column.label}`}
              width={column?.width || `${100 / columns.length}%`}
              onClick={() => column?.sort && sortData(column.id)}
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

      <tbody>
        {rowsData.map((row, rowIndex) => (
          <tr key={`${rowIndex}-${row?.id}`}>
            {row?.data?.map((rowData, rowDataIndex) => (
              <td key={`${rowDataIndex}-${rowData.label}`}>{rowData.label}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  searchedName: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
