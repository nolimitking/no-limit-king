import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bag from "../assets/bag.png";
import billionaire_beard_conditioner from "../assets/billionaire_beard_conditioner.png";
import billionaire_beard_straightener_brush from "../assets/billionaire_beard_straightener_brush.png";
import billionaire_beard_oil from "../assets/billionaire_beard_oil.png";
import billionaire_beard_wash from "../assets/billionaire_beard_wash.png";
import billionaire_beard_balm from "../assets/billionaire_beard_balm.png";

// Product data with full descriptions
const products = [
  {
    id: 1,
    name: "Gift Bag – No Limit King Billionaire Beard Kit",
    image: bag,
    fullDescription:
      "A premium, stylish gift bag crafted to match the luxury of the No Limit King Billionaire Beard Kit. Durable, sleek, and designed for unforgettable gifting — the perfect finishing touch for the ultimate beard-care experience.",
  },
  {
    id: 2,
    name: "Billionaire Beard Conditioner",
    image: billionaire_beard_conditioner,
    fullDescription:
      "Made with 100% natural ingredients to cleanse, soften, and deeply moisturize your beard. Enriched with Argan oil, Jojoba oil, aloe, green tea, and Provitamin B5. Massage through your beard for 2–3 minutes, then rinse.",
  },
  {
    id: 3,
    name: "Beard Straightener Brush",
    image: billionaire_beard_straightener_brush,
    fullDescription:
      "Premium heated comb for thicker and longer beards. Wash and dry beard, apply heat protectant, section hair, glide slowly, finish with beard oil or balm.",
  },
  {
    id: 4,
    name: "Billionaire Beard Oil",
    image: billionaire_beard_oil,
    fullDescription:
      "Promotes growth, repairs damage, softens and moisturizes beard. Ingredients include Argan, Jojoba, Apricot kernel, Sweet almond, Grapeseed, Vitamin E, Coconut, Avocado, Castor, Sunflower, Eucalyptus, Rosemary essential oils, Champaca, Rose, Lemon citrus, Black pepper, Sandalwood, and Laurel leaf.",
  },
  {
    id: 5,
    name: "Billionaire Beard Wash",
    image: billionaire_beard_wash,
    fullDescription:
      "Thoroughly cleanses, hydrates, softens, and detangles beard. Blend of botanical ingredients including apricot, aloe, rosemary, coconut, jojoba, argan, and avocado oils.",
  },
  {
    id: 6,
    name: "Beard Balm",
    image: billionaire_beard_balm,
    fullDescription:
      "Daily conditioner and softener with champaca essential oil. Smells fresh and luxurious.",
  },
];

const Kit = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleCloseOverlay = () => setSelectedProduct(null);

  const handleSlideChange = (swiper) => setActiveSlideIndex(swiper.realIndex);

  const getBackgroundImage = () =>
    products[activeSlideIndex % products.length]?.image || bag;

  return (
    <div
      className="relative py-16 px-4 min-h-screen transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center sm:mb-8 mb-[-24px]">
          <h1 className="text-4xl md:text-5xl font-semi-bold text-white mb-4">
            Essential Collection
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-light">
            Discover our curated selection of premium essentials — swipe through
            the collection to explore each item.
          </p>
        </div>

        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            speed={800}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: 0,
              stretch: -60,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="w-full pb-12"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="w-[300px] md:w-[340px] lg:w-[400px]"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-120 sm:h-150">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transform transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white text-sm font-light tracking-wider bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-normal text-white text-center tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-100"></div>
          <div className="swiper-button-next top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-100"></div>
          <div className="swiper-pagination bottom-6"></div>
        </div>
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm transition-all duration-300"
          onClick={handleCloseOverlay}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl transform transition-all duration-500 scale-95 opacity-0"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalEnter 0.4s ease-out forwards" }}
          >
            <button
              onClick={handleCloseOverlay}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">
                ×
              </span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="relative h-64 lg:h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-8 lg:p-12"
                />
              </div>

              <div className="p-6 md:p-8 lg:p-12 overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mb-6"></div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-light whitespace-pre-line">
                    {selectedProduct.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalEnter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .swiper-pagination-bullet { background-color: rgba(255, 255, 255, 0.5) !important; }
        .swiper-pagination-bullet-active { background-color: white !important; transform: scale(1.2); }
        @media (max-width: 768px) {
          .swiper-button-prev, .swiper-button-next { width: 40px !important; height: 40px !important; }
          .swiper-button-prev:after, .swiper-button-next:after { font-size: 20px !important; }
        }
        @media (max-width: 640px) {
          .swiper-button-prev, .swiper-button-next { width: 36px !important; height: 36px !important; }
          .swiper-button-prev:after, .swiper-button-next:after { font-size: 18px !important; }
          .swiper-button-prev { left: -12px !important; }
          .swiper-button-next { right: -12px !important; }
        }
      `}</style>
    </div>
  );
};

export default Kit;
