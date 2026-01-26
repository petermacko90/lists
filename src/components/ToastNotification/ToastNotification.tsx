import { createPortal } from 'react-dom';

export default function ToastNotification({
  show,
  text,
}: {
  show: boolean;
  text: string;
}) {
  return createPortal(
    <div
      className={'truncate toast' + (show ? ' show' : '')}
      role="status"
      aria-hidden={!show}
    >
      {text}
    </div>,
    document.body,
  );
}
