import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

type Props = JSX.HTMLAttributes<HTMLDialogElement>;

export function Dialog(props: Props): JSX.Element {
  const first = useRef<HTMLDialogElement>(null);

  const { open, ...rest } = props;

  useEffect(() => {
    if (open === false) {
      first.current!.close();
    } else {
      first.current!.showModal();
    }
  }, [open]);

  return (
    <dialog ref={first} {...rest}>
      {props.children}
    </dialog>
  );
}
