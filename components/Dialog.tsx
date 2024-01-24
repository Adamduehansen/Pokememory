import { JSX } from "preact/jsx-runtime";

type Props = JSX.HTMLAttributes<HTMLDialogElement>;

export function Dialog(props: Props): JSX.Element {
  return (
    <dialog {...props}>
      {props.children}
    </dialog>
  );
}
