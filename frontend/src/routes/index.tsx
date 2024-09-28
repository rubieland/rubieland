import { CropPictureModalProvider } from '../ui/components/Modal/providers/CropPictureModalProvider';
import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../ui/pages/Home/HomePage';

export const Route = createFileRoute('/')({
  component: () => (
    <CropPictureModalProvider>
      <HomePage />
    </CropPictureModalProvider>
  ),
});
