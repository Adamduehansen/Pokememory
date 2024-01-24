import { JSX } from "preact/jsx-runtime";
import { Dialog } from "@components/Dialog.tsx";

type Props = {
  open: boolean;
  onReset: () => void;
};

export function ResetCardsDialog(props: Props): JSX.Element {
  return (
    <Dialog open={props.open}>
      <button
        onClick={props.onReset}
      >
        Face Cards Down
      </button>
    </Dialog>
  );
}
