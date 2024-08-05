import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  Dispatch,
  useState,
} from 'react';

type CropPictureModalType = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpenModal: () => void;
};

const CropPictureModalContext = createContext<CropPictureModalType | null>(
  null,
);

export const CropPictureModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <CropPictureModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, toggleOpenModal }}
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
