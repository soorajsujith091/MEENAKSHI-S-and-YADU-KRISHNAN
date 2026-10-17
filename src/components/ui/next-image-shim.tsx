import type { ImgHTMLAttributes } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number | string;
}

/**
 * High-performance Next.js Image shim for Vite environments.
 * Supports priority loading, aspect ratio, styles, and responsive sizing.
 */
const Image = ({
  priority,
  unoptimized,
  quality,
  style,
  ...props
}: ImageProps) => {
  return (
    <img
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={style}
      {...props}
    />
  );
};

export default Image;
