import { MouseEventHandler, ReactNode } from 'react';
import './Button.css';

type ButtonColor = 'red' | 'green' | 'blue';

export default function Button({
  onClick,
  color,
  children,
  classes,
  title,
  disabled,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  color: ButtonColor;
  children: ReactNode;
  classes?: string;
  title?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`black b--none br3 pa3 b pointer dim shadow-4 bg-${color} ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
}
