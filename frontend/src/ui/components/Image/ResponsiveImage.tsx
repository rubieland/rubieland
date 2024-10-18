import { DetailedHTMLProps, SourceHTMLAttributes } from 'react';

interface ResponsiveImageProps {
  srcSet: DetailedHTMLProps<
    SourceHTMLAttributes<HTMLSourceElement>,
    HTMLSourceElement
  >[];
  loading?: 'eager' | 'lazy' | undefined;
  defaultSrc: string;
  alt: string;
}

const ResponsiveImage = ({
  loading = 'lazy',
  defaultSrc,
  srcSet,
  alt,
}: ResponsiveImageProps) => {
  return (
    <picture>
      {srcSet.map((src, index) => (
        <source key={index} media={src.media} srcSet={src.srcSet} />
      ))}
      <img src={defaultSrc} alt={alt} loading={loading} />
    </picture>
  );
};

export default ResponsiveImage;
