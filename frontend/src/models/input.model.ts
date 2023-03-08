import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Image } from "./article.model";

export interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, name: string) => void;
}

export interface InputIconProps extends InputProps {
  icon: IconDefinition;
  onClick?: () => void;
}

export interface InputImageProps {
  label: string;
  value: Image;
  onChange: (value: Image | string) => void;
}
