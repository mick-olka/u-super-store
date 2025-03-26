"use client";

import { ReactNode, useEffect, useState } from "react";

interface I_Props {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }: I_Props) => {
  const [curr, setCurr] = useState(0);
  const q = slides.length;
  const onPrev = () => {
    const prev = (c: number) => (c <= 0 ? q - 1 : c - 1);
    setCurr(prev);
  };
  const onNext = () => {
    const next = (c: number) => (c >= q - 1 ? 0 : c + 1);
    setCurr(next);
  };
  const isSingle = slides.length < 2;
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(onNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [slides]);
  return (
    <div className="overflow-hidden relative bg-white">
      <div
        className="flex transition-transform ease-out duration-500 max-h-96"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        {isSingle ? null : (
          <button onClick={onPrev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
            {"<"}
          </button>
        )}
        {isSingle ? null : (
          <button onClick={onNext} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
            {">"}
          </button>
        )}
      </div>
      {isSingle ? null : (
        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((s: ReactNode, i: number) => (
              <div
                key={i}
                className={`transition-all w-1.5 h-1.5 bg-black rounded-full  ${curr === i ? "p-0.5" : "bg-opacity-50"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
