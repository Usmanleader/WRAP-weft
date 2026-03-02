'use client';

import {motion} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export function AboutSnippet() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Trusted Sourcing Partner
            </div>
            <h2 className="font-serif text-4xl font-bold text-slate-900 leading-tight">
              Connecting Brands with Manufacturers Since 1985
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Wrap Weft & Co is a global denim sourcing agency with a verified network
              of 500+ manufacturers. We don&apos;t make fabrics—we connect you with the
              right mills, handle quality control, and ensure smooth transactions.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              From our Karachi office to serving clients worldwide, we&apos;ve built a
              reputation for integrity, expertise, and results.
            </p>
            <div className="pt-4">
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Read Our Full Story</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://picsum.photos/800/600?grayscale"
              alt="Textile Mill Loom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
