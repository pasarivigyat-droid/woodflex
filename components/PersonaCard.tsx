import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface EditorialPersonaCardProps {
  label: string;
  title: string;
  description: string[];
  ctaText: string;
  Icon: LucideIcon;
}

export const PersonaCard: React.FC<EditorialPersonaCardProps> = ({
  label,
  title,
  description,
  ctaText,
  Icon,
}) => {
  return (
    <div className="group relative flex flex-col h-full p-8 md:p-10 rounded-2xl bg-wood-50/50 border border-wood-100/50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-wood-100">
      
      {/* Icon Placeholder with Circle Background */}
      <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-wood-100 text-wood-400 group-hover:text-wood-900 group-hover:border-wood-300 group-hover:scale-105 transition-all duration-300 shadow-sm">
        <Icon strokeWidth={1.5} size={28} />
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-wood-400 mb-3 group-hover:text-wood-600 transition-colors">
        {label}
      </span>

      {/* Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-wood-900 mb-4 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <div className="flex-grow mb-8">
        {description.map((line, idx) => (
          <p key={idx} className="text-wood-600 font-sans text-sm leading-relaxed mb-1">
            {line}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <button className="flex items-center text-sm font-semibold uppercase tracking-wide text-wood-900 group-hover:text-wood-800 transition-colors">
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>
    </div>
  );
};