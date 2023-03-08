import { createContext } from "react";

interface UiContextProps {
  showBackdrop: boolean;
  setShowBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  backdropClick: boolean;
  setBackdropClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiContext = createContext<UiContextProps>({
  showBackdrop: false,
  setShowBackdrop: () => {},
  backdropClick: false,
  setBackdropClick: () => {},
});
