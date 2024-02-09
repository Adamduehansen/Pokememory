import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

type Props = JSX.HTMLAttributes<HTMLDialogElement> & {
  onClose?: () => void;
};

function isClickInDialog(
  { clientX, clientY }: MouseEvent,
  dialog: HTMLDialogElement,
): boolean {
  const rect = dialog.getBoundingClientRect();
  if (rect === undefined) {
    return false;
  }

  return (
    clientX > rect.x &&
    clientX < rect.x + rect.width &&
    clientY > rect.y &&
    clientY < rect.y + rect.height
  );
}

export function Dialog(props: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const { open, onClose, ...rest } = props;

  useEffect(() => {
    if (onClose === undefined) {
      return;
    }

    ref.current?.addEventListener("close", () => {
      onClose();
    });

    ref.current?.addEventListener("click", (event) => {
      if (isClickInDialog(event, ref.current!)) {
        return;
      }
      onClose();
    });
  }, []);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      return;
    }
    ref.current?.close();
  }, [open]);

  return (
    <dialog ref={ref} {...rest}>
      {props.children}
    </dialog>
  );
}
