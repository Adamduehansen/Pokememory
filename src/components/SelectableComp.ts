export interface SelectableComp {
  selected: boolean;
}

export function selectable(): SelectableComp {
  return {
    selected: false,
  };
}
