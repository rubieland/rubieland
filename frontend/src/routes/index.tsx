import { createFileRoute } from '@tanstack/react-router';
import Home from '../ui/pages/Home/Home';
import { CropPictureModalProvider } from '../ui/components/Modal/providers/CropPictureModalProvider';

export const Route = createFileRoute('/')({
  component: () => (
    <CropPictureModalProvider>
      <Home />
    </CropPictureModalProvider>
  ),
});
