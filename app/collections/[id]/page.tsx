import {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Button} from '@/components/ui/button';
import {collections as staticCollections} from '@/lib/data';
import {ArrowLeft, Check} from 'lucide-react';
import {ImageGallery} from '@/components/collection/image-gallery';
import {supabase, type Collection} from '@/lib/supabase';

interface PageProps {
  params: Promise<{id: string}>;
}

async function getCollection(id: string): Promise<Collection | null> {
  // Try to fetch from Supabase first
  if (supabase) {
    try {
      const {data, error} = await supabase
        .from('collections')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) return data;
      // If error (e.g. invalid UUID format), fall through to static
    } catch (e) {
      console.error('Supabase fetch error', e);
    }
  }

  // Fallback to static data
  const staticCollection = staticCollections.find((c) => c.id === id);
  if (staticCollection) {
    return {
      ...staticCollection,
      long_description: staticCollection.longDescription,
    } as unknown as Collection;
  }

  return null;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {id} = await params;
  const collection = await getCollection(id);

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: `${collection.title} | Wrap Weft & Co`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({params}: PageProps) {
  const {id} = await params;
  const collection = await getCollection(id);

  if (!collection) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <Link
            href="/collections"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-900 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Image Gallery */}
            <ImageGallery images={collection.images} title={collection.title} />

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 mb-4">
                  {collection.category}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {collection.title}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {collection.description}
                </p>
              </div>

              <div className="prose prose-slate prose-lg mb-8 text-slate-600">
                <p>{collection.long_description}</p>
              </div>

              <div className="mb-10">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {collection.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-3 w-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                <Button size="lg" variant="denim" className="flex-1" asChild>
                  <Link href={`/contact?subject=Request Swatches: ${collection.title}`}>Request Swatches</Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link href={`/contact?subject=Spec Sheet: ${collection.title}`}>Download Spec Sheet</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
