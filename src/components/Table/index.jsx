import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';

export const Table = ({ columns, rows }) => {
  const [rowsData, setRowsData] = useState(rows);
  const [order, setOrder] = useState('desc');

  const isAsc = order === 'asc';

  const findDataById = (options, id) => {
    return options.find((option) => option.id === id);
  };

  const toggleOrder = () => {
    if (order === 'asc') {
      setOrder('desc');
      return;
    }

    setOrder('asc');
  };

  const sortData = (id) => {
    const sortedRows = [...rowsData].sort((first, second) => {
      const a = findDataById(second.data, id)['label'];
      const b = findDataById(first.data, id)['label'];

      if (typeof a === 'string') {
        if (a > b) {
          return isAsc ? -1 : 1;
        }

        if (a < b) {
          return isAsc ? 1 : -1;
        }

        return 0;
      }

      return isAsc ? b - a : a - b;
    });

    setRowsData(sortedRows);
    toggleOrder();
  };

  useEffect(() => {
    setRowsData(rows);
  }, [rows]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th
              key={`${columnIndex}-${column.label}`}
              width={column?.width || `${100 / columns.length}%`}
              onClick={() => sortData(column.id)}
            >
              {column.label}

              <i
                className={cx('fa-solid fa-arrow-up', {
                  [styles.orderIconRotate]: isAsc,
                })}
              ></i>
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
      width: PropTypes.string,
    })
  ),
};

Table.defaultProps = {
  columns: [],
  rows: [],
};
