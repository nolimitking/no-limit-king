import image12 from "../assets/image12.png";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Owner = () => {
  // For animation triggers (install framer-motion for this)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/3 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      {/* Grid lines overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Image Container - Enhanced with modern framing */}
          <div
            className="relative order-2 lg:order-1"
            style={{
              transform: isInView ? "none" : "translateX(-100px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            <div className="relative group">
              {/* Main image with gradient overlay */}
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <img
                  src={image12}
                  alt="No Limit Bear Founder"
                  className="w-full h-[600px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Decorative frame elements */}
              <div className="absolute -inset-4 border border-amber-500/20 rounded-3xl group-hover:border-amber-500/40 transition-all duration-500" />
              <div className="absolute -inset-2 border border-amber-500/10 rounded-3xl" />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-500 to-amber-600 text-black px-6 py-3 rounded-xl font-bold text-lg shadow-2xl shadow-amber-500/20">
                FOUNDER
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className="order-1 lg:order-2"
            style={{
              transform: isInView ? "none" : "translateX(100px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)",
            }}
          >
            {/* Subtle label */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-amber-500/70 text-sm font-semibold tracking-widest uppercase">
                Vision & Philosophy
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                Billionaire Beard
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                Billionaire Beard is built on{" "}
                <span className="font-semibold text-amber-400">
                  discipline, ambition
                </span>
                , and the relentless mindset of pushing beyond perceived
                boundaries. More than a brand, it represents an unwavering
                commitment to consistency, hard work, and the courage to stand
                apart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Owner;
