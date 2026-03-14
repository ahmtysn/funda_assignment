'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  thumbnailUrl: string;
}

interface Props {
  images: GalleryImage[];
}

// Client Component - preloads next/prev images for fast navigation
export function Gallery({ images }: Props) {
  const [index, setIndex] = useState(0);

  // Load nearby images in the background.
  useEffect(() => {
    if (images.length < 2) return;
    
    const next = (index + 1) % images.length;
    const prev = (index - 1 + images.length) % images.length;
    
    [next, prev].forEach((i) => {
      const img = new window.Image();
      img.src = images[i].url;
    });
  }, [index, images]);

  if (!images.length) {
    return <div className="gallery__empty">Geen afbeeldingen</div>;
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="gallery">
      <div className="gallery__main">
        <Image
          src={images[index].url}
          alt={`Foto ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <span className="gallery__counter">{index + 1} / {images.length}</span>

        {images.length > 1 && (
          <>
            <button className="gallery__nav gallery__nav--prev" onClick={prev}>‹</button>
            <button className="gallery__nav gallery__nav--next" onClick={next}>›</button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`gallery__thumb ${i === index ? 'gallery__thumb--active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <Image src={img.thumbnailUrl} alt="" width={80} height={80} style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
