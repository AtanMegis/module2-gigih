import React from 'react';
import PropTypes from 'prop-types';

function ElementInput({ type, ...props }) {
  if (type === 'textarea') {
    return <textarea {...props} />
  }

  return <input type={type} {...props} />
}

export default function Input({ label, id, required, type, error, className, ...props }) {
  const classInput = ['input'];

  if (type === 'textarea') {
    classInput.push('input--large');
  }

  if (className) {
    classInput.push(className);
  }

  if (error) {
    classInput.push('input--error');
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}{required && <span>*</span>}</label>}
      
      <ElementInput
        type={type}
        id={id}
        className={classInput.join(' ')}
        required={required}
        {...props}
      />

      {error && <span className="input-group__error">{error}</span>}
    </div>
  )
}

Input.defaultProps = {
  label: null,
  type: 'text',
  error: null,
  required: false,
  className: '',
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};