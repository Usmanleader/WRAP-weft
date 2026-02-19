'use client';

import {motion} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

const collections = [
  {
    id: 'raw-denim',
    title: 'Raw Denim Series',
    description: 'Unwashed, untreated, and pure. The foundation of authentic jeanswear.',
    image: 'https://picsum.photos/600/800?random=1',
  },
  {
    id: 'sustainable-blends',
    title: 'Eco-Weave Blends',
    description: 'Organic cotton and recycled polyester blends for a sustainable future.',
    image: 'https://picsum.photos/600/800?random=2',
  },
  {
    id: 'stretch-tech',
    title: 'Performance Stretch',
    description: 'Advanced elasticity without compromising the authentic denim look.',
    image: 'https://picsum.photos/600/800?random=3',
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Curated Collections
            </h2>
            <p className="text-slate-600 text-lg">
              Explore our latest innovations in textile engineering, from heritage
              selvedge to modern performance fabrics.
            </p>
          </div>
          <Link
            href="/collections"
            className="group flex items-center gap-2 text-blue-900 font-medium hover:underline underline-offset-4"
          >
            View All Collections
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.1, duration: 0.5}}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 mb-4">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                {collection.title}
              </h3>
              <p className="text-slate-600 mb-4 line-clamp-2">
                {collection.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-blue-900 group-hover:underline underline-offset-4">
                Explore Collection
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
