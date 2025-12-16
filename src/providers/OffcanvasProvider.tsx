import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { OffCanvas } from '~/components';

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
interface OffCanvasContextType {
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
export const OffCanvasContext = createContext<OffCanvasContextType>({
  offCanvasState: INITIAL_STATE,
  showOffCanvas: () => null,
  closeOffCanvas: () => null,
});

interface OffcanvasProviderProps {
  children: ReactNode;
}

// content 역할을 해야할 스테이트
export const OffcanvasProvider: FC<OffcanvasProviderProps> = ({ children }) => {
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
    <OffCanvasContext.Provider
      value={{
        offCanvasState,
        showOffCanvas,
        closeOffCanvas,
      }}>
      <OffCanvas />
      {offCanvasState.show && (
        <div
          onClick={closeOffCanvas}
          className="fixed z-[1] h-full w-full bg-gray-50 bg-opacity-10"
        />
      )}

      {children}
    </OffCanvasContext.Provider>
  );
};
export function useOffCanvasContext() {
  return useContext(OffCanvasContext);
}
