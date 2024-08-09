import ReactCrop, { Crop } from 'react-image-crop';
import i18n from '../../../core/i18n';
import { useState } from 'react';

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;

interface CropperProps {
  src: string;
  alt: string;
}

const Cropper = ({ src, alt }: CropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    width: 50,
    height: 50,
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
  });

  return (
    <ReactCrop
      onChange={(c) => setCrop(c)}
      minWidth={MIN_DIMENSION}
      aspect={ASPECT_RATIO}
      keepSelection
      circularCrop
      crop={crop}
    >
      <img
        alt={i18n.t('cropPictureModal.alt', { label: alt })}
        src={src}
        style={{
          maxHeight: '70vh',
        }}
      />
    </ReactCrop>
  );
};

export default Cropper;
