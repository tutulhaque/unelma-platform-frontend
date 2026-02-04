import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SlidingText = ({ slidingTexts }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const totalWidth = container.scrollWidth / 2; // width of one set
    const duration = 25; // speed
    // Infinite loop animation
    gsap.to(container, {
      x: -totalWidth,
      ease: "linear",
      repeat: -1,
      duration,
    });
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden h-[80px] flex items-center"
      style={{
        background: "linear-gradient(90deg, #3780B2, #008081)",
      }}
    >
      <div
        ref={containerRef}
        className="flex whitespace-nowrap space-x-10 text-white text-2xl font-bold items-center h-full"
      >
        {/* Render two sets of texts for smooth loop */}
        {[...slidingTexts, ...slidingTexts].map((item, index) => (
          <span
            key={index}
            className="sliding-item drop-shadow-lg tracking-wide transition-all duration-500"
          >
            {item.title}
          </span>
        ))}
      </div>

      {/* shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SlidingText;
