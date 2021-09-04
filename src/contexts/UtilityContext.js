import { createContext, useState } from "react";
import { useSnackbar } from "notistack";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const toast = (message, variant = "default") => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <UtilityContext.Provider value={{ toast, isLoading, setIsLoading }}>
      {children}
    </UtilityContext.Provider>
  );
};
