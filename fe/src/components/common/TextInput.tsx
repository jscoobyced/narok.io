import * as React from 'react';
import './Input.scss';
import './TextInput.scss';

interface MyProps {
  content: string,
  onChange?: (event: any) => void,
  className?: string
}

export const TextInput: React.StatelessComponent<MyProps> = (props) => {
  /* eslint-disable react/prop-types */
  const { content, onChange, className } = props;
  /* eslint-enable react/prop-types */

  return (
    <input
      type="text"
      className={`input ${className}`}
      onChange={onChange}
      value={content}
    />
  );
};

TextInput.defaultProps = {
  onChange: (event: any) => { },
  className: '',
};
