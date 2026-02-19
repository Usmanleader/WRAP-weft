import Link from 'next/link';
import {Facebook, Instagram, Linkedin, Twitter} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-500 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl">
                W
              </div>
              <span className="text-lg font-serif font-bold tracking-tight text-white">
                Wrap Weft & Co
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              Premium denim and textile supplier for the modern fashion industry.
              Crafting quality fabrics since 1985.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-4">
              Collections
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/denim" className="hover:text-blue-400">
                  Raw Denim
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/sustainable"
                  className="hover:text-blue-400"
                >
                  Sustainable Blends
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/stretch"
                  className="hover:text-blue-400"
                >
                  Stretch Fabrics
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/vintage"
                  className="hover:text-blue-400"
                >
                  Vintage Selvedge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-blue-400">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-4">
              Connect
            </h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-slate-400">
              Subscribe to our newsletter for the latest fabric trends.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Wrap Weft & Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
