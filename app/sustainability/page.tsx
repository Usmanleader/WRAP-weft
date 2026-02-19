'use client';

import {motion} from 'motion/react';
import Image from 'next/image';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {Leaf, Droplets, Recycle, Sun} from 'lucide-react';

export default function SustainabilityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-green-900 flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://picsum.photos/1920/1080?grayscale&blur=2"
              alt="Cotton Field"
              fill
              className="object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
              Conscious Creation
            </h1>
            <p className="text-xl text-green-100">
              Weaving a better future through sustainable innovation and ethical practices.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-24 px-4 md:px-6 container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Commitment to the Planet
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              The textile industry has historically been one of the most resource-intensive
              sectors in the world. At Wrap Weft & Co, we are challenging that narrative.
              By integrating circular economy principles, reducing water usage, and
              sourcing organic materials, we are proving that luxury and sustainability
              can coexist.
            </p>
          </div>
        </section>

        {/* Key Initiatives */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  icon: Leaf,
                  title: 'Organic Materials',
                  desc: 'We source 100% GOTS-certified organic cotton, ensuring no harmful chemicals or pesticides are used in cultivation.',
                  image: 'https://picsum.photos/600/400?random=10',
                },
                {
                  icon: Droplets,
                  title: 'Water Stewardship',
                  desc: 'Our closed-loop filtration systems recycle 95% of water used in the dyeing process, significantly reducing our freshwater footprint.',
                  image: 'https://picsum.photos/600/400?random=11',
                },
                {
                  icon: Recycle,
                  title: 'Circular Design',
                  desc: 'We repurpose pre-consumer waste into new yarns and design fabrics that are easier to recycle at the end of their life.',
                  image: 'https://picsum.photos/600/400?random=12',
                },
                {
                  icon: Sun,
                  title: 'Renewable Energy',
                  desc: 'Our primary manufacturing facility is powered by 80% solar energy, with a goal to reach 100% by 2028.',
                  image: 'https://picsum.photos/600/400?random=13',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{delay: idx * 0.1}}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-12">
            Certified Excellence
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for certification logos */}
            {['GOTS', 'OEKO-TEX', 'Fair Trade', 'Better Cotton Initiative'].map((cert) => (
              <div key={cert} className="flex items-center justify-center h-24 w-48 border border-slate-200 rounded-lg bg-slate-50">
                <span className="font-bold text-slate-400">{cert}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
