import { FC, ReactNode, createContext, useContext, useState } from 'react';

import Spinner from '~/components/Spinner';

interface SpinnerContextType {
  spinnerState?: boolean;
  showSpinner(): void;
  closeSpinner(): void;
}
export const SpinnerContext = createContext<SpinnerContextType>({
  spinnerState: false,
  showSpinner: () => null,
  closeSpinner: () => null,
});

interface SpinnerProviderProps {
  children: ReactNode;
}

export const SpinnerProvider: FC<SpinnerProviderProps> = ({ children }) => {
  const [spinnerState, setSpinnerState] = useState(false);
  const showSpinner = () => {
    document.body.style.overflow = 'hidden';

    setSpinnerState(!spinnerState);
  };

  const closeSpinner = () => {
    document.body.style.overflow = 'unset';
    setSpinnerState(false);
  };

  return (
    <SpinnerContext.Provider
      value={{
        spinnerState,
        showSpinner,
        closeSpinner,
      }}>
      <Spinner />
      {children}
    </SpinnerContext.Provider>
  );
};
export function useSpinnerContext() {
  return useContext(SpinnerContext);
}
