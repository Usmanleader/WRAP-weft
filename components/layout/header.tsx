'use client';

import * as React from 'react';
import Link from 'next/link';
import {Menu, X, ShoppingBag} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {motion, AnimatePresence} from 'motion/react';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-900 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl">
            W
          </div>
          <span className="text-lg font-serif font-bold tracking-tight text-slate-900">
            Wrap Weft & Co
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/collections"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/sustainability"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Sustainability
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="denim" size="sm" asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <nav className="flex flex-col p-4 gap-4">
              <Link
                href="/collections"
                className="text-sm font-medium text-slate-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/sustainability"
                className="text-sm font-medium text-slate-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Sustainability
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-600 hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button variant="denim" className="w-full" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
