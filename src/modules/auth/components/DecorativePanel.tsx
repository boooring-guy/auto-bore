"use client";

import Image from "next/image";

export function DecorativePanel() {
  // In development, use unoptimized to avoid Next.js image cache
  // In production, consider using a version/hash in the filename or query param
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/image_1.jpg"
        alt="Decorative background"
        fill
        className="object-cover"
        loading="lazy"
        unoptimized={isDev}
      />
    </div>
  );
}
