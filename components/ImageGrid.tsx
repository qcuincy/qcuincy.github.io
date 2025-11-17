'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageGridProps {
  images: string[];
  alt: string;
}

const ImageGrid = ({ images, alt }: ImageGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={`grid gap-2 p-2 bg-gray-100 ${
          images.length === 1
            ? 'grid-cols-1'
            : images.length === 2
            ? 'grid-cols-2'
            : images.length === 3
            ? 'grid-cols-3'
            : 'grid-cols-2 md:grid-cols-2'
        }`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ImageGrid;