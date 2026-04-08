import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProjectKit } from '../types';
import { useInView } from '../hooks/useInView';

export const ProjectKits: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const kits: ProjectKit[] = [
    {
      id: 'cafe-boho',
      label: 'Café Kit',
      title: 'Boho Coffee Bar',
      specs: ['Seats: 18–24', 'Mood: Warm, earthy, casual', 'Key pieces: Chairs C03, Dining D02, Planter P01'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'cafe-fine',
      label: 'Café Kit',
      title: 'Fine Dining Setup',
      specs: ['Seats: 40–60', 'Mood: Minimal, dim, acoustic', 'Key pieces: Lounge L05, Table T09'],
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'home-3bhk',
      label: 'Home Kit',
      title: '3BHK Living + Dining',
      specs: ['Area: 450 sq.ft', 'Style: Modern Indian', 'Key pieces: Sofa S01, Jhula J02'],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'home-courtyard',
      label: 'Home Kit',
      title: 'Bungalow Courtyard',
      specs: ['Outdoor / Semi-open', 'Material: Weather-proof Teak', 'Key pieces: Planter P01, Bench B04'],
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="w-full py-24 bg-wood-50 border-b border-wood-200 overflow-hidden" ref={ref}>
      <div className={`max-w-7xl mx-auto px-6 mb-12 text-center transition-all duration-700 delay-100 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="font-serif text-3xl md:text-4xl text-wood-900 mb-4">
          See rooms, not just products.
        </h2>
        <p className="text-wood-600 font-light text-lg">
          Start from real spaces – then tweak sizes, materials and budget with us.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 px-6 md:px-[calc((100vw-80rem)/2)] scrollbar-hide gap-8">
        {kits.map((kit, index) => (
          <div 
            key={kit.id} 
            style={{ transitionDelay: `${200 + index * 100}ms` }}
            className={`flex-shrink-0 w-[85vw] md:w-[450px] bg-white rounded-sm overflow-hidden snap-center group hover:shadow-xl transition-all duration-500 ease-out transform ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            {/* Image Area */}
            <div className="h-64 md:h-72 overflow-hidden relative">
              <img 
                src={kit.image} 
                alt={kit.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>
            
            {/* Content Area */}
            <div className="p-8 border border-t-0 border-wood-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-widest uppercase font-bold text-wood-400">
                  {kit.label}
                </span>
              </div>
              
              <h3 className="font-serif text-2xl text-wood-900 mb-4">{kit.title}</h3>
              
              <ul className="space-y-2 mb-8">
                {kit.specs.map((spec, i) => (
                  <li key={i} className="text-sm text-wood-500 flex items-start">
                    <span className="w-1 h-1 bg-wood-300 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>

              <button className="text-xs font-bold uppercase tracking-wider text-wood-900 border-b border-wood-200 pb-1 group-hover:border-wood-900 transition-colors flex items-center">
                View this kit <ArrowRight className="ml-2 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Padding spacer for right side of scroll */}
        <div className="w-6 flex-shrink-0" />
      </div>
    </section>
  );
};