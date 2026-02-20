'use client';

import {useState, useEffect} from 'react';
import {motion} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {supabase, type Collection} from '@/lib/supabase';
import {collections as staticCollections} from '@/lib/data';

export function FeaturedCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      if (supabase) {
        try {
          const {data} = await supabase
            .from('collections')
            .select('*')
            .eq('is_featured', true)
            .limit(3);
          
          if (data && data.length > 0) {
            setCollections(data);
            return;
          }
        } catch (e) {
          console.error('Error fetching featured collections', e);
        }
      }
      
      // Fallback to static data (first 3 items)
      setCollections(staticCollections.slice(0, 3).map(c => ({
        ...c,
        long_description: c.longDescription
      })));
    }

    fetchFeatured();
  }, []);

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
              <Link href={`/collections/${collection.id}`}>
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
