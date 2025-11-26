"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { ReviewTestimonial } from "@/lib/types";

interface ReviewMarqueeProps {
  reviews: ReviewTestimonial[];
}

const ReviewCard = ({
  review,
  cardRef,
}: {
  review: ReviewTestimonial;
  cardRef?: RefObject<HTMLDivElement>;
}) => {
  const ratingWidth = `${(review.rating / 5) * 100}%`;
  const label = Number.isInteger(review.rating)
    ? `${review.rating}/5`
    : `${review.rating.toFixed(1)}/5`;

  return (
    <div
      ref={cardRef}
      className="flex h-[72px] min-w-[15rem] items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur md:block md:h-auto md:w-60 md:min-w-[15.5rem] md:p-4"
    >
      <div className="flex flex-1 flex-col justify-center gap-1 text-xs leading-snug md:text-sm">
        <div className="flex flex-col md:gap-1">
          <p className="text-sm font-semibold text-white md:text-base">
            {review.author}
          </p>
          <p className="hidden text-[0.7rem] uppercase tracking-wide text-white/50 md:block">
            {review.role}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[0.75rem] text-white/70 md:text-xs">
          <div className="relative text-base text-white/20 md:text-lg" aria-hidden="true">
            <span className="font-semibold tracking-tight">*****</span>
            <span
              className="absolute inset-0 overflow-hidden text-amber-300"
              style={{ width: ratingWidth }}
            >
              <span className="font-semibold tracking-tight">*****</span>
            </span>
          </div>
          <span className="text-[0.7rem] font-semibold text-white/70 md:text-xs">
            {label}
          </span>
        </div>
        <p className="hidden text-sm text-white/80 md:mt-3 md:block">
          {review.quote}
        </p>
        <p className="block max-w-[11rem] truncate text-[0.78rem] text-white/75 md:hidden">
          {review.quote}
        </p>
      </div>
    </div>
  );
};

export const ReviewMarquee = ({ reviews }: ReviewMarqueeProps) => {
  const loopedReviews = [...reviews, ...reviews];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cardStep, setCardStep] = useState(260);
  const animationDurationSeconds = 220;

  useEffect(() => {
    if (firstCardRef.current) {
      const width = firstCardRef.current.getBoundingClientRect().width;
      setCardStep(Math.ceil(width + 24));
    }
  }, []);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    let rafId: number;
    const driftPerFrame = 0.25; // gentle drift

    const tick = () => {
      if (!isPaused) {
        container.scrollLeft += driftPerFrame;
        const loopWidth = container.scrollWidth / 2;
        if (loopWidth > 0 && container.scrollLeft >= loopWidth) {
          container.scrollLeft -= loopWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  const handleNext = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const loopWidth = container.scrollWidth / 2;
    const nextOffset = container.scrollLeft + cardStep;
    if (loopWidth === 0) return;
    container.scrollLeft = nextOffset >= loopWidth ? nextOffset - loopWidth : nextOffset;
  };

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 overflow-hidden border-t border-white/10 bg-[#040a18]/90 backdrop-blur md:static md:rounded-[28px] md:border md:border-white/10 md:bg-gradient-to-r md:from-white/10 md:via-white/5 md:to-[#040a18] md:p-6 md:shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
      <div className="relative flex items-center gap-3 px-4 py-3 md:px-0 md:py-0 md:pb-4 md:justify-center md:text-center md:pr-16">
        <div className="flex items-center gap-2 md:absolute md:left-0">
          <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-300/70 opacity-70 animate-pulse-dot" />
          </span>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/70 md:hidden">
            Now watching
          </p>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:block">
            Lab reviews
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 text-left md:text-center">
          <h3 className="text-xl font-semibold text-white">150+ verified chemists</h3>
          <p className="text-sm text-white/65">
            Slow-scrolling feed of operators rating ChemPort in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:flex md:opacity-60 md:hover:opacity-100 md:focus-visible:opacity-100"
          aria-label="Next review"
        >
          Next
          <span aria-hidden="true" className="text-white/60">
            &gt;
          </span>
        </button>
      </div>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex min-w-max gap-6 overflow-x-scroll px-4 pb-4 pt-1 touch-pan-x md:overflow-hidden md:px-0 md:pb-0 md:animate-marquee-left"
          style={{
            animationDuration: `${animationDurationSeconds}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
        >
          {loopedReviews.map((review, index) => (
            <ReviewCard
              key={`${review.id}-${index}`}
              review={review}
              cardRef={index === 0 ? firstCardRef : undefined}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#040a18] via-[#040a18]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#040a18] via-[#040a18]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#040a18]/90 via-[#040a18]/60 to-transparent md:hidden" />
      </div>
    </aside>
  );
};
