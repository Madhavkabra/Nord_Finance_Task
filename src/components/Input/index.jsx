import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.css';
import { useOutsideClickListener } from '../../hooks/useOutsideClickListener';

export const Input = ({ name, value, onChange, placeholder, ...props }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();

  useOutsideClickListener({
    ref: inputRef,
    onClickOutside: () => setFocused(false),
  });

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleClearInputButtonClick = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div
      ref={inputRef}
      className={cx(styles.inputContainer, {
        [styles.inputContainerFocused]: focused,
      })}
      onClick={handleInputFocus}
    >
      <input
        className={styles.input}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        ref={(ref) => (focused && ref ? ref.focus() : ref)}
        {...props}
      />

      {/* Clear input button */}
      {value && (
        <div
          data-testid='clear-input-button'
          className={styles.inputIconContainer}
          onClick={handleClearInputButtonClick}
        >
          <i className='fa-solid fa-xmark fa-lg'></i>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
