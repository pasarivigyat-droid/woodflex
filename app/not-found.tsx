import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="pt-48 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
      <p className="text-sm uppercase tracking-[0.2em] text-ink/50 mb-6">404</p>
      <h1 className="font-serif text-5xl md:text-7xl mb-8">This page doesn&rsquo;t exist.</h1>
      <p className="text-lg text-ink/60 mb-10">It may have moved. Try one of these instead:</p>
      <div className="flex flex-wrap gap-4">
        <Link href="/" className="px-6 py-3 bg-ink text-white text-xs uppercase tracking-widest rounded-full">
          Home
        </Link>
        <Link href="/products" className="px-6 py-3 border border-ink/30 text-xs uppercase tracking-widest rounded-full">
          Products
        </Link>
        <Link href="/contact" className="px-6 py-3 border border-ink/30 text-xs uppercase tracking-widest rounded-full">
          Contact
        </Link>
      </div>
    </section>
  );
}
