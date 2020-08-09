import * as React from 'react';
import './Button.scss';

interface MyProps {
  onClick: (event: any) => void;
  className?: string;
  onMouseDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  title?: string;
}

export const Button: React.StatelessComponent<MyProps> = (props) => {
  /* eslint-disable react/prop-types */
  const {
    onClick, className, title, onMouseDown, onKeyPress, children,
  } = props;
  /* eslint-enable react/prop-types */

  return (
    <span
      onClick={onClick}
      onMouseDown={onMouseDown}
      onKeyPress={onKeyPress}
      role="button"
      title={title}
      tabIndex={-1}
      className={`button ${className}`}
    >
      {children}
    </span>
  );
};

Button.defaultProps = {
  title: '',
  className: '',
  onKeyPress: () => { },
  onMouseDown: () => { },
};
