import {
  useState,
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

type CropPictureModalType = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpenModal: () => void;
  closeModal: () => void;
};

const CropPictureModalContext = createContext<CropPictureModalType | null>(
  null,
);

export const CropPictureModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CropPictureModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, toggleOpenModal, closeModal }}
    >
      {children}
    </CropPictureModalContext.Provider>
  );
};

export const useCropPictureModalContext = () => {
  const pictureModalContext = useContext(CropPictureModalContext);

  if (!pictureModalContext) {
    throw new Error(
      'useCropPictureModalContext has to be used within <CropPictureModalProvider>',
    );
  }

  return pictureModalContext;
};
