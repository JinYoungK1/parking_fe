import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContextType {
  sidebarState?: boolean;
  showSidebar(): void;
  closeSidebar(): void;
}
export const SidebarContext = createContext<SidebarContextType>({
  sidebarState: false,
  showSidebar: () => null,
  closeSidebar: () => null,
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarState, setSidebarState] = useState(false);
  const showSidebar = () => {
    setSidebarState(!sidebarState);
  };
  const closeSidebar = () => {
    setSidebarState(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        showSidebar,
        closeSidebar,
      }}>
      {children}
    </SidebarContext.Provider>
  );
};
export function useSidebarContext() {
  return useContext(SidebarContext);
}
