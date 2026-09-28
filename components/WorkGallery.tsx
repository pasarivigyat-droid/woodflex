'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { Img } from './Img';
import { WORK_TYPES, showcaseAlt, type FurnitureType, type ShowcaseItem } from '@/lib/catalog';

type Filter = FurnitureType | 'all';

export function WorkGallery({ items }: { items: ShowcaseItem[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filters: { label: string; value: Filter }[] = [{ label: 'All Projects', value: 'all' }, ...WORK_TYPES];
  const count = (v: Filter) => (v === 'all' ? items.length : items.filter((i) => i.type === v).length);
  const visible = useMemo(() => (filter === 'all' ? items : items.filter((i) => i.type === filter)), [filter, items]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
  }, [selected]);

  return (
    <>
      <div className="sticky top-20 z-40 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-ink/5 py-4 mb-16 overflow-x-auto scrollbar-hide">
        <div
          role="group"
          aria-label="Filter projects"
          className="px-6 md:px-12 max-w-7xl mx-auto flex gap-10 min-w-max justify-center lg:justify-start"
        >
          {filters.map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(f.value)}
                className={`group relative pb-2 text-sm uppercase tracking-widest transition-all ${
                  isActive ? 'text-ink font-bold' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {f.label} <span className="text-[10px] align-top opacity-50 ml-1">({count(f.value)})</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-ink transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <section id="work-grid" aria-labelledby="gallery-heading" className="px-6 md:px-12 max-w-7xl mx-auto scroll-mt-32">
        <h2 id="gallery-heading" className="font-serif text-3xl md:text-4xl mb-10">
          Project gallery
        </h2>
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {visible.map((item) => (
            <li key={item.id} className="break-inside-avoid mb-8">
              <button
                type="button"
                onClick={() => setSelected(item)}
                aria-label={`Enlarge: ${showcaseAlt(item)}`}
                className="group relative block w-full overflow-hidden rounded-xl bg-wood-50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Img
                  image={item.image}
                  alt={showcaseAlt(item)}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-sm shadow-sm border border-black/5 text-[10px] uppercase tracking-widest font-black text-wood-700">
                  {item.context === 'studio' ? 'Workshop' : 'Real Home'}
                </span>
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                    <Maximize2 className="text-white w-5 h-5" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={() => setSelected(null)}
        aria-label="Project photo"
        className="w-screen h-screen max-w-none max-h-none m-0 p-6 md:p-12 bg-[#FDFCFB]/95 backdrop:bg-transparent"
      >
        {selected && (
          <div className="w-full h-full flex items-center justify-center">
            <Img
              image={selected.image}
              alt={showcaseAlt(selected)}
              sizes="95vw"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain shadow-2xl rounded-lg"
              priority
            />
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-8 right-8 text-ink/50 hover:text-ink transition-colors p-2 bg-ink/5 rounded-full"
            >
              <X size={28} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
