import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const TableContainer = ({ children }) => {
  return <div className={styles.tableContainer}>{children}</div>;
};

TableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
};
