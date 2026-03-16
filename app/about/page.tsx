'use client';

import {motion} from 'motion/react';
import Image from 'next/image';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/1920/1080?grayscale&blur=2"
              alt="Factory Floor"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
              Your Trusted Sourcing Partner
            </h1>
            <p className="text-xl text-slate-300">
              Connecting global brands with premium garment manufacturers.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 px-4 md:px-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
                From Local Mill to Global Network
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
              Warp Weft & Co began as a small garment trading office in Karachi.
              What started as a local connection between Pakistani manufacturers
              and regional buyers has evolved into a global sourcing agency with
              a verified network of 500+ garment manufacturers across Pakistan,
              China, Turkey, and Japan.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We connect you with premium garment manufacturers from our curated
                network of 500+ partners across Pakistan, China, Turkey, and Japan.
                With decades of expertise, we match you with suppliers that meet your
                exact specifications—quality, capacity, and price. From initial sampling
                to final delivery, we manage every step so you can build your brand
                with confidence.
              </p>
            </div>
            <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden bg-slate-100">
              <Image
                src="https://picsum.photos/800/1000?grayscale"
                alt="Vintage Loom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-slate-600 text-lg">
                The principles that guide every decision we make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Verified Network',
                  desc: 'Every manufacturer in our network undergoes a 47-point verification process covering quality, capacity, certifications, and ethical practices.',
                },
                {
                  title: 'End-to-End Support',
                  desc: 'From initial requirement gathering to final delivery, we manage sampling, quality inspections, negotiations, and logistics.',
                },
                {
                  title: 'Global Reach',
                  desc: 'Our network spans 500+ manufacturers across Pakistan, China, Turkey, Japan, and beyond, giving you access to diverse capabilities and competitive pricing.',
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{delay: idx * 0.1}}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-100"
                >
                  <h3 className="font-serif text-xl font-bold text-blue-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
