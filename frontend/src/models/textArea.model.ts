export interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, name: string) => void;
  cols?: number;
  rows?: number;
}
