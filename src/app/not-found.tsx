import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#f8f8f9] text-[#0f1013] flex flex-col justify-between p-6 sm:p-12 md:p-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight text-neutral-950 uppercase">
          USAMA<span className="text-xs align-super ml-0.5 font-bold">®</span>
        </Link>
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Error 404</span>
      </div>

      {/* Center 404 Statement */}
      <div className="max-w-2xl my-auto py-12">
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-neutral-400 block mb-3">
          PAGE NOT FOUND
        </span>
        <h1 className="font-black text-7xl sm:text-8xl md:text-9xl tracking-tight text-neutral-950 uppercase leading-none mb-6">
          404
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 max-w-lg mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to another coordinate.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-[#ea580c] text-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-400 flex items-center justify-between">
        <span>© 2026 Usama. All rights reserved.</span>
        <span>Shopify Architect &amp; Developer</span>
      </div>
    </main>
  );
}
