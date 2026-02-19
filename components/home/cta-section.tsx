'use client';

import {motion} from 'motion/react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="py-24 bg-blue-900 relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Ready to Create Your Next Collection?
          </h2>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Partner with Wrap Weft & Co for premium fabrics that define quality.
            Request a sample kit or schedule a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" variant="secondary" className="text-blue-900 font-bold" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/collections">Browse Catalog</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
