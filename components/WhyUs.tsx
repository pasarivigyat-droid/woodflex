import React from 'react';

export const WhyUs: React.FC = () => {
  return (
    <section className="w-full py-24 bg-wood-50 relative border-b border-wood-200">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-wood-900">
            Why teams trust a small workshop<br />over big catalogs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Column 1 */}
          <div className="flex flex-col items-start group">
            <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200 w-full group-hover:border-wood-400 transition-colors">
              Built to your space
            </h3>
            <p className="text-wood-600 font-light leading-relaxed text-sm md:text-base">
              Standard catalog sizes rarely fit Indian homes or compact café layouts perfectly. We adjust dimensions of our sofas, dining tables, and jhulas to fit your specific floor plan down to the inch.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start group">
            <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200 w-full group-hover:border-wood-400 transition-colors">
              Material clarity
            </h3>
            <p className="text-wood-600 font-light leading-relaxed text-sm md:text-base">
              No mystery materials. Order any major product in three simple bands: <strong className="font-medium text-wood-800">Essentials</strong> (solid mango/acacia), <strong className="font-medium text-wood-800">Plus</strong> (teak/oak), or <strong className="font-medium text-wood-800">Signature</strong> (premium imported grains and fabrics).
            </p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start group">
            <h3 className="font-serif text-xl text-wood-900 mb-4 pb-3 border-b border-wood-200 w-full group-hover:border-wood-400 transition-colors">
              From workshop to site
            </h3>
            <p className="text-wood-600 font-light leading-relaxed text-sm md:text-base">
              We handle the messy part. From a quick concept call to dimensions freeze, we build it in our Surat workshop with proper joinery and ship it directly to your site ready for installation.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};