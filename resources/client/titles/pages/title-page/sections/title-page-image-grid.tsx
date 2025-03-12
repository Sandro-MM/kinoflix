import {TitleImage} from '@app/titles/models/title-image';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {ImageZoomDialog} from '@ui/overlays/dialog/image-zoom-dialog';
import {ButtonBase} from '@ui/buttons/button-base';
import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';
import {ImageSize, useImageSrc} from '@app/images/use-image-src';
import {ReactNode} from 'react';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';

interface Props {
  images: TitleImage[];
  count?: number;
  heading?: ReactNode;
  srcSize?: ImageSize;
}
export function TitlePageImageGrid({images, count, heading, srcSize}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const {trans} = useTrans();
  if (!images?.length) return null;

  if (!count) {
    count = isMobile ? 6 : 5;
  }

  return (
    <div className="mt-48">
      {heading}
      <div className="grid grid-cols-3 gap-12 md:grid-cols-5 md:gap-24">
        {images.slice(0, count).map((image, index) => (
          <DialogTrigger type="modal" key={image.id}>
            <ButtonBase
              aria-label={trans(message('Image :index', {values: {index}}))}
            >
              <ImageItem image={image} srcSize={srcSize} />
            </ButtonBase>
            <ImageZoomDialog
              images={images.map(img => img.url)}
              defaultActiveIndex={index}
            />
          </DialogTrigger>
        ))}
      </div>
    </div>
  );
}

interface ImageProps {
  image: TitleImage;
  srcSize?: ImageSize;
}
function ImageItem({image, srcSize = 'md'}: ImageProps) {
  const src = useImageSrc(image.url, {size: srcSize});
  return (
    <img
      className="aspect-square w-full cursor-pointer rounded object-cover"
      src={src}
      alt=""
    />
  );
}
