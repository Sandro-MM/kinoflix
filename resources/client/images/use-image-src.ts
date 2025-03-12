import {getAssetUrl} from '@ui/utils/urls/get-asset-url';

export type ImageSize = 'sm' | 'md' | 'lg' | 'original';

interface Options {
  size?: ImageSize;
}

export function useImageSrc(
  src: string | undefined,
  {size}: Options = {},
): string | undefined {
  if (!src) return;
  if (!size) size = 'original';

  if (src.includes('image.tmdb')) {
    return getTmdbSrc(src, size);
  }

  return `${getLocalSrc(getAssetUrl(src), size)}`;
}

export function useImageSrcSet(src: string | undefined): string | undefined {
  if (!src) return;

  if (src.includes('image.tmdb') || src.includes('themoviedb')) {
    return `${src.replace(/original|w1280/, 'w300')} 768w, ${src.replace(
      /original|w1280/,
      'w780',
    )} 1024w, ${src.replace(/original|w1280/, 'w1280')} 1280w`;
  }

  return `${src.replace(/original/, 'small')} 768w, ${src.replace(
    /original/,
    'medium',
  )} 1024w, ${src.replace(/original/, 'large')} 1280w`;
}

function getTmdbSrc(initialSrc: string, size: ImageSize): string {
  switch (size) {
    case 'sm':
      return initialSrc.replace(/original|w1280/, 'w92');
    case 'md':
      return initialSrc.replace(/original|w1280/, 'w300');
    case 'lg':
      return initialSrc.replace(/original|w1280/, 'w500');
    default:
      return initialSrc;
  }
}

function getLocalSrc(initialSrc: string, size: ImageSize): string {
  switch (size) {
    case 'sm':
      return initialSrc.replace('original', 'small');
    case 'md':
      return initialSrc.replace('original', 'medium');
    case 'lg':
      return initialSrc.replace('original', 'large');
    default:
      return initialSrc;
  }
}
