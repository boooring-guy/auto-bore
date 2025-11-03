"use client";

import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 border-t border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 sm:px-8 z-10">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
          <span className="text-white font-semibold text-xs">A</span>
        </div>
        <span className="text-gray-900 font-medium text-sm tracking-tight">
          Auto_bore
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <span className="font-normal">Powered by</span>
        <Link
          href="https://thebooringstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-150"
        >
          The Boooring Studio
        </Link>
      </div>
    </footer>
  );
}
