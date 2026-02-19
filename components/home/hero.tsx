'use client';

import {motion} from 'motion/react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1080?grayscale&blur=2" // Placeholder for a nice denim texture
          alt="Denim Texture Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 md:px-6">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, ease: 'easeOut'}}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-block rounded-full bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-200 border border-blue-800/50 backdrop-blur-sm">
            Est. 1985 • Premium Textile Manufacturing
          </div>
          <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            Weaving the Fabric of <span className="text-blue-400">Modern Fashion</span>
          </h1>
          <p className="text-lg text-slate-300 md:text-xl max-w-lg">
            Wrap Weft & Co specializes in high-quality denim and sustainable
            textiles. We bring texture, durability, and innovation to your
            designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" variant="denim" className="text-base px-8" asChild>
              <Link href="/collections">View Collections</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/contact">Request Samples</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.5, duration: 1}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
