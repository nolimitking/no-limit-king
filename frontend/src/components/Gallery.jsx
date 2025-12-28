import Marquee from "react-fast-marquee";
import { useRef } from "react";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image13 from "../assets/image13.png";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image13,
];

const Gallery = () => {
  const marqueeRef = useRef(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-amber-500/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Luxury decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        {/* Title with luxury styling */}
        <div className="text-center mb-20 md:mb-28">
          <div className="inline-block mb-6">
            <h2 className="text-sm md:text-base font-light tracking-[0.4em] text-gray-300 uppercase mb-2">
              Curated Visual Excellence
            </h2>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8">
            Showcasing{" "}
            <span className="font-medium bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Our Masterpieces
            </span>
          </h1>
        </div>

        {/* Main Marquee Container - Bigger and closer */}
        <div className="relative group">
          {/* Marquee with bigger, closer photos */}
          <Marquee
            ref={marqueeRef}
            speed={45}
            gradient={false}
            pauseOnHover={true}
            autoFill
            className="py-4"
          >
            {images.map((img, index) => (
              <div key={index} className="mx-2 md:mx-4 group/item relative">
                <div className="relative p-4 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900/20 to-gray-900/5 backdrop-blur-sm border border-gray-800/30 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover/item:from-amber-500/3 group-hover/item:to-amber-500/0 transition-all duration-500"></div>

                  <img
                    src={img}
                    alt={`Partner ${index + 1}`}
                    className="relative z-10 h-50 md:h-70 rounded-lg lg:h-90 w-auto object-contain transition-all duration-500 group-hover/item:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Marquee>

          {/* Second layer for depth - Also bigger and closer */}
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            direction="right"
            className="py-10 -mt-12 md:-mt-16"
          >
            {images
              .slice()
              .reverse()
              .map((img, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-2 md:mx-4 group/item relative"
                >
                  <div className="relative p-3 md:p-4 rounded-xl bg-gradient-to-br from-gray-900/15 to-gray-900/5 backdrop-blur-sm border border-gray-800/20 hover:border-amber-500/30 transition-all duration-500">
                    <img
                      src={img}
                      alt={`Partner ${images.length - index}`}
                      className="h-40 md:h-50 lg:h-70 w-auto rounded-lg object-contain opacity-90 group-hover/item:opacity-100 transition-all duration-500 group-hover/item:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
