'use client';

import {useState, useEffect} from 'react';
import {motion} from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {collections as staticCollections} from '@/lib/data';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {supabase, type Collection} from '@/lib/supabase';
import {toast} from 'sonner';

const categories = ['All', 'Denim', 'Sustainable', 'Performance', 'Lightweight', 'Workwear'];

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      setIsLoading(true);
      if (supabase) {
        try {
          const {data, error} = await supabase
            .from('collections')
            .select('*');
          
          if (error) {
            console.error('Error fetching collections:', error);
            toast.error('Failed to load collections from database. Using offline data.');
            setCollections(staticCollections.map(c => ({
              ...c,
              long_description: c.longDescription
            })));
          } else if (data) {
            setCollections(data);
          }
        } catch (err) {
          console.error('Unexpected error:', err);
          setCollections(staticCollections.map(c => ({
            ...c,
            long_description: c.longDescription
          })));
        }
      } else {
        // Fallback to static data if Supabase is not configured
        setCollections(staticCollections.map(c => ({
          ...c,
          long_description: c.longDescription
        })));
      }
      setIsLoading(false);
    }

    fetchCollections();
  }, []);

  const filteredCollections = activeCategory === 'All'
    ? collections
    : collections.filter(c => c.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 pb-24">
        {/* Page Header */}
        <section className="bg-slate-900 text-white py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center space-y-4">
            <h1 className="font-serif text-4xl md:text-6xl font-bold">
              Our Collections
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore our diverse range of premium fabrics, from heritage selvedge
              to cutting-edge sustainable blends.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 md:px-6 py-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    activeCategory === category
                      ? "bg-blue-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="container mx-auto px-4 md:px-6 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 h-[500px] animate-pulse">
                  <div className="bg-slate-200 h-[300px] w-full" />
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-slate-200 w-3/4 rounded" />
                    <div className="h-4 bg-slate-200 w-full rounded" />
                    <div className="h-4 bg-slate-200 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCollections.map((collection) => (
                <motion.div
                  layout
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.9}}
                  transition={{duration: 0.3}}
                  key={collection.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                >
                  <Link href={`/collections/${collection.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-sm">
                        {collection.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-slate-600 mb-6 line-clamp-2">
                        {collection.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-blue-900 uppercase tracking-wide group-hover:underline underline-offset-4">
                        View Details
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && filteredCollections.length === 0 && (
            <div className="text-center py-24">
              <p className="text-slate-500 text-lg">No collections found in this category.</p>
              <Button
                variant="link"
                onClick={() => setActiveCategory('All')}
                className="mt-4"
              >
                View all collections
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
