import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@components/Dialog.tsx";
import { useEffect, useRef } from "preact/hooks";

type Props = {
  open: boolean;
  onReset: () => void;
};

export function ResetCardsDialog({ open, onReset }: Props): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open === false) {
      return;
    }

    buttonRef.current!.focus();
  }, [open]);

  return (
    <Dialog open={open}>
      <button
        ref={buttonRef}
        onClick={onReset}
      >
        Face Cards Down
      </button>
    </Dialog>
  );
}
