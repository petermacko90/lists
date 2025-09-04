import { MouseEventHandler, ReactNode } from 'react';
import './Button.css';

export default function Button({
  onClick,
  color,
  children,
  classes,
  title,
  disabled,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  color: 'red' | 'green' | 'blue';
  children: ReactNode;
  classes?: string;
  title?: string;
  disabled?: boolean;
}) {
  const standardClasses =
    `pa3 ba bw1 b--${color} br3 bg-light-${color} bg-transparent black b shadow-4 lh-solid action-button`;
  const stateClasses = disabled ? ` o-50` : ` pointer hover-bg-${color} hover-white`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`${standardClasses}${stateClasses} ${classes ?? ''}`}
    >
      {children}
    </button>
  );
}
