import type { ImageAsset } from '@/lib/catalog';

interface ImgProps {
  image: ImageAsset;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

// Plain <img> with pre-generated WebP srcset; width/height reserve space to avoid layout shift.
export function Img({ image, alt, sizes, className, priority }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
