"use client";

import Image from "next/image";
import Link from "next/link";

export function DecorativePanel() {
  return (
    <div className="relative w-full h-full bg-[#1e3a5f] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/image_1.jpg"
        alt="Decorative background"
        fill
        className="object-cover opacity-40"
        priority
      />

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-[#1e3a5f]/50" />

      {/* Floating privacy/terms element */}
      <div className="absolute bottom-20 right-6 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 shadow-lg z-10">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-4 h-4 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <div className="text-xs text-white/70">
          <Link href="/privacy" className="hover:text-white hover:underline">
            Privacy
          </Link>
          <span className="text-white/50 mx-1">-</span>
          <Link href="/terms" className="hover:text-white hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
