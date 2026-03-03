import type {Metadata} from 'next';
import {Inter, Playfair_Display} from 'next/font/google';
import {Toaster} from 'sonner';
import Script from 'next/script';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Warp Weft & Co | Global Denim Sourcing Agency & Manufacturer Network',
  description: 'Global denim sourcing agency connecting brands with verified manufacturers worldwide. Access 500+ denim mills, quality assurance, and end-to-end sourcing services.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
        <Script 
          src="https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
