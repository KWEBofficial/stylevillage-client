export interface Item {
  label: string;
  isSelected: boolean;
}

export interface GroupItem {
  label: string;
  handleClick: () => void;
}
