import { create } from 'zustand';

interface ModalState {
  [key: string]: {
    ref: React.RefObject<HTMLDialogElement> | null;
    isOpen: boolean;
  };
}

interface ModalStore {
  modals: ModalState;
  actions: {
    setRef: (modalKey: string, ref: React.RefObject<HTMLDialogElement>) => void;
    closeModal: (modalKey: string) => void;
    openModal: (modalKey: string) => void;
  };
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  actions: {
    setRef: (modalKey, ref) =>
      set((state) => ({
        modals: {
          ...state.modals,
          [modalKey]: { ...state.modals[modalKey], ref },
        },
      })),

    openModal: (modalKey) => {
      const modal = get().modals[modalKey];
      if (modal?.ref?.current && !modal.ref.current.hasAttribute('open')) {
        modal.ref.current.showModal();
        set((state) => ({
          modals: {
            ...state.modals,
            [modalKey]: { ...modal, isOpen: true },
          },
        }));
      }
    },

    closeModal: (modalKey) => {
      const modal = get().modals[modalKey];
      if (modal?.ref?.current && modal.ref.current.hasAttribute('open')) {
        modal.ref.current.close();
        set((state) => ({
          modals: {
            ...state.modals,
            [modalKey]: { ...modal, isOpen: false },
          },
        }));
      }
    },
  },
}));

export const useModalStoreActions = () =>
  useModalStore((state) => state.actions);

export const useModalIsOpen = (modalKey: string) =>
  useModalStore((state) => state.modals[modalKey]?.isOpen || false);
