import { RefObject, useContext } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { LocaleContext } from '../../context';

export function Dialog({
  ref,
  text,
  onClose,
}: {
  ref: RefObject<HTMLDialogElement | null>;
  text: string;
  onClose: (returnValue: string) => void;
}) {
  const translation = useContext(LocaleContext);

  return createPortal(
    <dialog ref={ref} onClose={(e) => onClose(e.currentTarget.returnValue)}>
      <p>{text}</p>
      <Button color="red" onClick={() => ref.current?.close('confirm')}>
        {translation.CONFIRM}
      </Button>
      <Button color="blue" onClick={() => ref.current?.close()}>
        {translation.CANCEL}
      </Button>
    </dialog>,
    document.body
  );
}
