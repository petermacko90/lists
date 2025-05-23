export default function ToastNotification({ show, text }) {
  return <div className={'truncate toast' + (show ? ' show' : '')}>{text}</div>;
}
