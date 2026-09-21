import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(next, images.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }, [images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      if (track.clientWidth === 0) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div
          ref={trackRef}
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {images.map((src, i) => (
            <div key={src} className="min-w-full snap-center">
              <img
                src={src}
                alt={`${alt} — imagem ${i + 1}`}
                className="aspect-square w-full bg-muted object-contain"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding={i === 0 ? "sync" : "async"}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={() => scrollTo(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-soft transition hover:bg-background"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Imagem seguinte"
              onClick={() => scrollTo(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-soft transition hover:bg-background"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-foreground/45 px-2 py-1.5">
              {images.map((src, i) => (
                <span
                  key={`dot-${src}`}
                  className={cn(
                    "h-1.5 rounded-full bg-background transition-all",
                    i === index ? "w-5 opacity-100" : "w-1.5 opacity-55",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={`thumb-${src}`}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn(
                "flex-1 overflow-hidden rounded-xl border-2 bg-card transition",
                i === index ? "border-primary" : "border-border opacity-75 hover:opacity-100",
              )}
            >
              <img
                src={src}
                alt=""
                className="aspect-square w-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
