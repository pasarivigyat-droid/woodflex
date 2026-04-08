import React from 'react';
import { Sofa, Armchair, Utensils, Flower2, Bed, RockingChair } from 'lucide-react';

export const ProductStrip: React.FC = () => {
  const products = [
    { icon: Sofa, label: 'Sofas' },
    { icon: Utensils, label: 'Dining tables' },
    { icon: Armchair, label: 'Chairs' },
    { icon: RockingChair, label: 'Jhulas' },
    { icon: Flower2, label: 'Planter stands' },
    { icon: Bed, label: 'Beds' },
  ];

  return (
    <section className="w-full py-12 bg-white/50 border-t border-b border-wood-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-xs font-bold tracking-[0.2em] uppercase text-wood-400 mb-8">
          What we build
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {products.map((item) => (
            <div key={item.label} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-wood-50 border border-wood-100 text-wood-800 hover:border-wood-300 transition-colors cursor-default">
              <item.icon strokeWidth={1.5} size={16} className="text-wood-500" />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};