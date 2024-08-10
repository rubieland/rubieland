import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
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

  // TODO: see if this function is needed...
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: '%',
          width: MIN_DIMENSION,
        },
        ASPECT_RATIO,
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(crop);
  };

  return (
    <ReactCrop
      onChange={(c) => setCrop(c)}
      minWidth={MIN_DIMENSION}
      aspect={ASPECT_RATIO}
      keepSelection
      circularCrop
      crop={crop}
    >
      {src && (
        <img
          alt={i18n.t('cropPictureModal.alt', { label: alt })}
          onLoad={() => onImageLoad}
          src={src}
          style={{
            width: '100%',
            maxHeight: '50vh',
          }}
        />
      )}
    </ReactCrop>
  );
};

export default Cropper;
