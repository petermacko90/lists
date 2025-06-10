export default function ToastNotification({ show, text }: { show: boolean; text: string }) {
  return (
    <div className={'truncate toast' + (show ? ' show' : '')} role="status" aria-hidden={!show}>
      {text}
    </div>
  );
}
