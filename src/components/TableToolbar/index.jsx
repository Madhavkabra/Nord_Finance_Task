import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import styles from './styles.module.css';

export const TableToolbar = ({
  title,
  inputName,
  inputPlaceholder,
  inputValue,
  onChangeInput,
  showInput,
}) => {
  return (
    <div className={styles.tableToolbar}>
      <p className={styles.tableToolbarTitle}>{title}</p>

      {showInput && (
        <Input
          name={inputName}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={onChangeInput}
        />
      )}
    </div>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  inputName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.string,
  onChangeInput: PropTypes.func,
  showInput: PropTypes.bool,
};

TableToolbar.defaultProps = {
  showInput: false,
};
