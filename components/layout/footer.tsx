'use client';

import Link from 'next/link';
import Image from 'next/image';
import {Facebook, Instagram, Linkedin, Twitter, FileText} from 'lucide-react';
import {Button} from '@/components/ui/button';

export function Footer() {

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/retygfdh.png"
                alt="Wrap Weft & Co"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              Global denim sourcing agency connecting brands with verified manufacturers.
              Your trusted partner in fabric sourcing since 1985.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-white mb-4">
              Manufacturer Network
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections" className="hover:text-blue-400">
                  All Manufacturers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=Jeans"
                  className="hover:text-blue-400"
                >
                  Jeans Manufacturers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=Jackets"
                  className="hover:text-blue-400"
                >
                  Jacket Manufacturers
                </Link>
              </li>
              <li>
                <Link
                  href="/collections?category=Skirts"
                  className="hover:text-blue-400"
                >
                  Skirt Manufacturers
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
              <li>
                <a 
                  href="/WARPWEFT&CO.pdf"
                  download="WARPWEFT&CO.pdf"
                  className="hover:text-blue-400 flex items-center gap-2 text-left"
                >
                  <FileText className="h-3 w-3" />
                  Download Company Profile
                </a>
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
