'use client';

import {useState} from 'react';
import Image from 'next/image';
import {motion, AnimatePresence} from 'motion/react';
import {cn} from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({images, title}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedImage]}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg bg-slate-100 transition-all duration-200",
              selectedImage === idx ? "ring-2 ring-blue-900 ring-offset-2" : "opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
