import './Button.css';

export default function Button({ onClick, color, children, title, classes, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`black b--none pa3 b pointer dim bg-${color} ${classes ? classes : ''}`}
    >
      {children}
    </button>
  );
}
