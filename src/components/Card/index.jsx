import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const Card = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
