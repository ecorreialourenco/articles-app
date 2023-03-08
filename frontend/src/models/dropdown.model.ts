export interface DropdownProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string, name: string) => void;
}

export interface Option {
  label: string;
  value: string;
}
