'use client';

import {motion} from 'motion/react';
import {Sprout, Droplets, Recycle, ShieldCheck} from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    title: 'Sustainably Sourced',
    description: 'We partner with certified organic cotton farms to ensure ethical sourcing.',
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description: 'Our dyeing process uses 80% less water than traditional methods.',
  },
  {
    icon: Recycle,
    title: 'Circular Economy',
    description: 'We recycle fabric scraps and use post-consumer waste in our blends.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Every yard is inspected for durability, texture, and color consistency.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Responsible Manufacturing
          </h2>
          <p className="text-slate-400 text-lg">
            We are committed to reducing our environmental footprint while maintaining
            the highest standards of textile production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.1}}
              className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors group"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 text-blue-400 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
