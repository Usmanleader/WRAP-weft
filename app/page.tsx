import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Hero} from '@/components/home/hero';
import {FeaturedCollections} from '@/components/home/featured-collections';
import {AboutSnippet} from '@/components/home/about-snippet';
import {ProcessSection} from '@/components/home/process-section';
import {CtaSection} from '@/components/home/cta-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSnippet />
        <FeaturedCollections />
        <ProcessSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
