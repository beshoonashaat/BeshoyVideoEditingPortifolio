"use client";

import { useState } from "react";

export default function BehanceImage({ behance, fallback, alt = "" }) {
  const [src, setSrc] = useState(
    `/api/behance-image?url=${encodeURIComponent(behance)}`
  );

  return (
    <img
      src={src}
      alt={alt}
      onError={() => {
        if (fallback && src !== fallback) setSrc(fallback);
      }}
    />
  );
}
