import { FC, ReactNode, createContext, useContext, useState } from 'react';

import { ContentsModal } from '~/components';

interface InitialStateType {
  show?: boolean;
  title: string;
  size?: string;
  content: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  bgBlock?: boolean;
  onConfirm?(): void;
  onCancel?(): void;
}
interface ContentModalContextType {
  contentsModalState?: InitialStateType;
  isOpen: boolean;
  showModal(state?: InitialStateType): void;
  closeModal(): void;
}

const INITIAL_STATE: InitialStateType = {
  show: false,
  size: 'max-w-5xl',
  title: '',
  content: '',
  confirmText: '확인',
  cancelText: '취소',
  onConfirm: undefined,
  onCancel: undefined,
};
export const ContentsModalContext = createContext<ContentModalContextType>({
  contentsModalState: INITIAL_STATE,
  isOpen: false,
  showModal: () => null,
  closeModal: () => null,
});

interface ContentsModalProviderProps {
  children: ReactNode;
}

export const ContentsModalProvider: FC<ContentsModalProviderProps> = ({
  children,
}) => {
  const [contentsModalState, setContentsModalState] = useState(INITIAL_STATE);
  const showModal = (state?: InitialStateType) => {
    setContentsModalState({
      ...INITIAL_STATE,
      ...state,
      show: true,
    });
  };
  const closeModal = () => {
    setContentsModalState({
      ...INITIAL_STATE,
    });
  };
  return (
    <ContentsModalContext.Provider
      value={{
        contentsModalState,
        isOpen: contentsModalState.show || false,
        showModal,
        closeModal,
      }}>
      <ContentsModal />

      {children}
    </ContentsModalContext.Provider>
  );
};
export function useContentsModalContext() {
  return useContext(ContentsModalContext);
}
