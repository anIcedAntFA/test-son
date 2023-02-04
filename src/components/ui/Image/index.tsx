import { ImgHTMLAttributes, useState } from 'react';
import { images } from 'src/constants';

interface IImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

function Image({
  src,
  alt,
  width,
  height,
  fallback: customFallback = images.noImage,
  ...passProps
}: IImageProps) {
  const [fallback, setFallback] = useState('');

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      src={fallback || src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      {...passProps}
    />
  );
}

export default Image;
