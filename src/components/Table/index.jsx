import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const Table = ({ columns, rows }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th
              key={`${columnIndex}-${column.label}`}
              width={column?.width || `${100 / columns.length}%`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
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
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      width: PropTypes.string,
    })
  ),
};

Table.defaultProps = {
  columns: [],
  rows: [],
};
