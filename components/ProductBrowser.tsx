'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Img } from './Img';
import type { Product, ProductCategory } from '@/lib/catalog';
import { whatsappLink } from '@/lib/site';

interface Section {
  category: ProductCategory;
  items: Product[];
}

const altFor = (p: Product, c: ProductCategory) =>
  `${p.title} — custom ${c.singular} made to order by Woodflex Designs, Surat`;

function specLine(p: Product): string | null {
  if (p.dimensions) return `W ${p.dimensions.width} × D ${p.dimensions.depth} × H ${p.dimensions.height}`;
  if (p.seatOptions?.length) return p.seatOptions.map((o) => o.label).join(' · ');
  return null;
}

export function ProductBrowser({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<{ product: Product; category: ProductCategory } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  const open = (product: Product, category: ProductCategory) => {
    setActive({ product, category });
    window.gtag?.('event', 'view_sku_detail', { sku_id: product.id, name: product.title, category: product.category });
  };

  return (
    <>
      {/* CATEGORY NAV */}
      <nav
        aria-label="Product categories"
        className="sticky top-20 z-40 bg-[#f9f9f9]/90 backdrop-blur-sm border-b border-wood-900/10 mb-12 py-4 -mx-6 px-6 md:-mx-12 md:px-12 overflow-x-auto scrollbar-hide"
      >
        <ul className="flex gap-8 max-w-7xl mx-auto min-w-max">
          {sections.map(({ category, items }) => (
            <li key={category.id}>
              <a
                href={`#${category.slug}`}
                className="text-sm uppercase tracking-widest text-wood-900/60 hover:text-wood-900 transition-colors"
              >
                {category.label} <span className="text-[10px] align-top opacity-60 ml-1">({items.length})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto space-y-24">
        {sections.map(({ category, items }) => (
          <section key={category.id} id={category.slug} aria-labelledby={`${category.slug}-heading`} className="scroll-mt-40">
            <div className="mb-10 max-w-3xl">
              <h2 id={`${category.slug}-heading`} className="font-serif text-3xl md:text-4xl mb-3">
                {category.label}
              </h2>
              <p className="text-wood-900/60">{category.intro}</p>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12">
              {items.map((product) => {
                const spec = specLine(product);
                return (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => open(product, category)}
                      className="group w-full text-left"
                      aria-haspopup="dialog"
                    >
                      <div className="w-full aspect-[4/5] bg-white rounded-sm overflow-hidden relative mb-4 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                        <Img
                          image={product.image}
                          alt={altFor(product, category)}
                          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 48vw"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex justify-center items-end">
                          <span className="text-white text-xs uppercase tracking-widest flex items-center gap-2">
                            View details <ArrowRight size={12} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <h3 className="font-serif text-lg leading-tight">{product.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-wood-900/50 mt-1">{product.id}</p>
                      {spec && <p className="text-xs text-wood-900/50 mt-1">{spec}</p>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* DETAIL DIALOG */}
      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        aria-labelledby="product-dialog-title"
        className="w-[95vw] max-w-6xl max-h-[92vh] p-0 bg-white rounded-sm shadow-2xl backdrop:bg-[#eff1f3]/90 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="relative flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gray-50 p-8 md:p-12 flex flex-col items-center justify-center gap-6">
              <Img
                image={active.product.image}
                alt={altFor(active.product, active.category)}
                sizes="(min-width: 768px) 45vw, 90vw"
                className="max-h-[55vh] w-auto object-contain"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-wood-900/50 mb-2">
                  {active.category.label} · {active.product.id}
                </p>
                <h2 id="product-dialog-title" className="font-serif text-3xl md:text-4xl text-wood-900">
                  {active.product.title}
                </h2>
              </div>

              {active.product.dimensions && (
                <dl className="grid grid-cols-3 gap-4 text-sm">
                  {(['width', 'depth', 'height'] as const).map((k) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-widest text-wood-900/50">{k}</dt>
                      <dd>{active.product.dimensions![k]}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {active.product.seatOptions && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-wood-900/50 mb-2">Sizes</h3>
                  <ul className="text-sm space-y-1">
                    {active.product.seatOptions.map((o) => (
                      <li key={o.label}>
                        {o.label}: {o.size}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.product.drawing && (
                <figure>
                  <a href={active.product.drawing.src} target="_blank" rel="noopener" className="block cursor-zoom-in">
                    <Img
                      image={active.product.drawing}
                      alt={`Technical drawing with dimensions for ${active.product.title}`}
                      className="w-full max-h-[40vh] object-contain mix-blend-multiply"
                    />
                  </a>
                  <figcaption className="text-[10px] uppercase tracking-widest text-wood-900/50 mt-2">
                    Technical board · click to open full size
                  </figcaption>
                </figure>
              )}

              <p className="text-sm text-wood-900/60">
                Every design can be resized and made in the wood and finish of your choice.
              </p>
              <a
                href={whatsappLink(`Hi, I'm interested in ${active.product.title} (${active.product.id}). Can you share details?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center py-4 bg-ink text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-wood-900 transition-colors rounded-sm"
              >
                Enquire on WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 bg-wood-900/5 hover:bg-wood-900/10 rounded-full text-wood-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
