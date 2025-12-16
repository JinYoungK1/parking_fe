import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { OffCanvasFile } from '~/components';

interface InitialStateType {
  show?: boolean;
  title: string;
  content: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  bgBlock?: boolean;
  onConfirm?(): void;
  onCancel?(): void;
}
interface OffCanvasFileContextType {
  offCanvasState?: InitialStateType;
  showOffCanvas(state?: InitialStateType): void;
  closeOffCanvas(): void;
}

const INITIAL_STATE: InitialStateType = {
  show: false,
  title: '',
  content: '',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: undefined,
  onCancel: undefined,
  bgBlock: false,
};
export const OffCanvasFileContext = createContext<OffCanvasFileContextType>({
  offCanvasState: INITIAL_STATE,
  showOffCanvas: () => null,
  closeOffCanvas: () => null,
});

interface OffcanvasFileProviderProps {
  children: ReactNode;
}

// content 역할을 해야할 스테이트
export const OffcanvasFileProvider: FC<OffcanvasFileProviderProps> = ({ children }) => {
  const [offCanvasState, setOffCanvasState] = useState(INITIAL_STATE);
  const showOffCanvas = (state?: InitialStateType) => {
    setOffCanvasState({
      ...INITIAL_STATE,
      ...state,
      show: true,
    });
  };
  const closeOffCanvas = () => {
    setOffCanvasState({
      ...INITIAL_STATE,
    });
  };

  useEffect(() => {
    if (offCanvasState.show) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = '15px';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  }, [offCanvasState.show]);
  return (
    <OffCanvasFileContext.Provider
      value={{
        offCanvasState,
        showOffCanvas,
        closeOffCanvas,
      }}>
      <OffCanvasFile />
      {offCanvasState.show && (
        <div
          onClick={closeOffCanvas}
          className="fixed z-[1] h-full w-full bg-gray-50 bg-opacity-10"
        />
      )}

      {children}
    </OffCanvasFileContext.Provider>
  );
};
export function useOffCanvasFileContext() {
  return useContext(OffCanvasFileContext);
}
