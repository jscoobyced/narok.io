import * as React from 'react';

interface MyProps {
  action: (event: any) => Promise<void>;
  className: string;
  children?: string;
}

export const Button = (props: MyProps) => {
  const { action, className, children } = props;

  return (
    <span
      onClick={action}
      onKeyPress={() => { }}
      role="button"
      tabIndex={-1}
      className={`button ${className}`}
    >
      {children}
    </span>
  );
};

Button.defaultProps = {
  children: '',
};
