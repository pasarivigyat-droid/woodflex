import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-wood-50 text-wood-900 pt-16 pb-12">
      {/* Thin top border is handled by the section above in this layout, or we can add explicit border here */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">

          {/* Left: Brand */}
          <div className="flex flex-col items-start">
            <h4 className="font-serif text-2xl tracking-tight font-semibold text-wood-900 mb-4">Woodflex Designs</h4>
            <p className="text-wood-400 text-xs font-medium uppercase tracking-wider">&copy; {new Date().getFullYear()} Woodflex Designs.</p>
          </div>

          {/* Center: Contact */}
          <div className="flex flex-col items-start md:items-center md:text-center space-y-2 text-wood-600 font-light">
            <p className="font-medium text-wood-900 uppercase text-xs tracking-widest mb-1">Studio</p>
            <p className="hover:text-wood-900 transition-colors cursor-pointer">WhatsApp: +91 94290 04803</p>
            <p className="hover:text-wood-900 transition-colors cursor-pointer">woodflex.vigyat@gmail.com</p>
            <p className="mb-2">Surat, India</p>
            <a
              href="https://www.instagram.com/woodflex.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-wood-600 hover:text-wood-900 transition-colors group"
            >
              <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-medium">@woodflex.design</span>
            </a>
          </div>

          {/* Right: CTA Text */}
          <div className="flex flex-col items-start md:items-end md:text-right">
            <p className="text-wood-900 font-serif text-xl leading-snug max-w-xs">
              "Send us your floor plan or photos and we’ll suggest options for free."
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};