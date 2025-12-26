import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Product data with full descriptions - using public paths
const products = [
  {
    id: 1,
    name: "Gift Bag – No Limit King Billionaire Beard kit",
    image: "/assets/bag.png",
    fullDescription:
      "A premium, stylish gift bag crafted to match the luxury of the No Limit King Billionaire Beard Kit. Durable, sleek, and designed for unforgettable gifting — the perfect finishing touch for the ultimate beard-care experience.",
  },
  {
    id: 2,
    name: "billionaire beard conditioner",
    image: "/assets/billionaire_beard_conditioner.png",
    fullDescription:
      "Made with 100% natural ingredients to cleanse, soften, and deeply moisturize your beard. Enriched with Argan oil, Jojoba oil, aloe, green tea, and Provitamin B5, it leaves a luxurious scent with notes of sandalwood and champaca. After shampooing, massage through your beard, leave for 2–3 minutes, then rinse. For best results, pair with the Billionaire Beard Oil.",
  },
  {
    id: 3,
    name: "beard Straightener brush",
    image: "/assets/billionaire_beard_straightener_brush.png",
    fullDescription:
      "The Billionaire Beard Straightener Brush is a premium heated comb designed for thicker and longer beards. For best results, wash and dry your beard thoroughly, apply a heat protectant, and section the hair before straightening. Glide the brush slowly from roots to ends without pausing too long to prevent heat damage. Finish with beard oil or balm for a smooth, polished look. Use sparingly to maintain beard health or consult a professional barber for expert styling.",
  },
  {
    id: 4,
    name: "billionaire beard oil",
    image: "/assets/billionaire_beard_oil.png",
    fullDescription:
      "Designed to promote rapid growth, repair damage, and provide softening and moisturizing benefits to your beard, leaving you feeling refreshed and emitting a luxurious scent. INGREDIENTS: Our formulation objective is to provide a rich beard oil abundant in natural and organic ingredients. Comprised of Argan, Jojoba, Apricot kernel, Sweet almond, Grapeseed, Vitamin E, Coconut, Avocado, Castor, Sunflower, Eucalyptus, Rosemary essential oils, Champaca, Rose, Lemon citrus, Black pepper, Sandalwood, and Laurel leaf.",
  },
  {
    id: 5,
    name: "billionaire beard wash",
    image: "/assets/billionaire_beard_wash.png",
    fullDescription:
      "Expertly formulated to thoroughly cleanse, hydrate, soften, and detangle your beard. About this item: Our unique blend of botanical ingredients, including apricot and aloe, works in harmony with a carefully crafted blend of natural oils, featuring organic rosemary, coconut oil, jojoba, argan, and avocado oil. Our Nolimit beard wash set provides a deep cleanse and nourishment. Simply apply a small amount of shampoo, add water, massage into your beard, and the rich lather will take care of the rest.",
  },
  {
    id: 6,
    name: "beard balm",
    image: "/assets/billionaire_beard_balm.png",
    fullDescription:
      "No Limit Billionaire Beard Balm most used daily Conditioner and softener with champaca essential oil Smelling fresh and luxurious.",
  },
];

const Kit = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCloseOverlay = () => {
    setSelectedProduct(null);
  };

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  };

  // Get the background image based on active slide
  const getBackgroundImage = () => {
    const product = products[activeSlideIndex % products.length];
    return product?.image || "/assets/bag.png";
  };

  return (
    <div
      className="relative py-8 md:py-16 px-4 min-h-screen transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Luxury Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semi-bold text-white mb-2 md:mb-4">
            Essential Collection
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light px-2">
            Discover our curated selection of premium essentials — swipe through
            the collection to explore each item.
          </p>
        </div>

        {/* Cover Flow Slider */}
        <div className="relative pt-4 md:pt-0">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? "auto" : "auto"}
            initialSlide={0}
            loop={true}
            speed={800}
            onSlideChange={handleSlideChange}
            coverflowEffect={{
              rotate: isMobile ? 10 : 0,
              stretch: isMobile ? -40 : -60,
              depth: isMobile ? 100 : 150,
              modifier: isMobile ? 1.5 : 2,
              slideShadows: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                coverflowEffect: {
                  rotate: 10,
                  stretch: -20,
                  depth: 80,
                  modifier: 1.2,
                },
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                coverflowEffect: {
                  rotate: 10,
                  stretch: -30,
                  depth: 100,
                  modifier: 1.5,
                },
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 30,
                coverflowEffect: {
                  rotate: 0,
                  stretch: -60,
                  depth: 150,
                  modifier: 2,
                },
              },
            }}
            navigation={
              !isMobile
                ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }
                : false
            }
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="w-full pb-12"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="w-[280px] sm:w-[300px] md:w-[340px] lg:w-[400px]"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image Container */}
                  <div className="h-80 sm:h-96 md:h-120 lg:h-150">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 sm:p-6 transform transition-transform duration-300 hover:scale-105"
                    />
                    {/* Click hint overlay - hidden on mobile for cleaner UI */}
                    <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
                      <span className="text-white text-sm font-light tracking-wider bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-normal text-white text-center tracking-tight px-2">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Only show on desktop */}
          {!isMobile && (
            <>
              <div className="swiper-button-prev top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:4rem] md:[--swiper-navigation-sides-offset:8rem] lg:[--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-90 lg:scale-100"></div>
              <div className="swiper-button-next top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:4rem] md:[--swiper-navigation-sides-offset:8rem] lg:[--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-90 lg:scale-100"></div>
            </>
          )}

          {/* Custom Pagination */}
          <div className="swiper-pagination bottom-4 md:bottom-6"></div>
        </div>
      </div>

      {/* Full Screen Overlay Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/95 backdrop-blur-sm transition-all duration-300"
          onClick={handleCloseOverlay}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg md:rounded-2xl bg-white shadow-2xl transform transition-all duration-500 scale-95 opacity-0"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalEnter 0.4s ease-out forwards" }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="text-xl md:text-2xl group-hover:rotate-90 transition-transform duration-300">
                ×
              </span>
            </button>

            <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-4 sm:p-6 md:p-8 lg:p-12"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
                <div className="mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg font-light italic mb-2 md:mb-4">
                    {selectedProduct.title}
                  </p>
                  <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mb-4 md:mb-6"></div>
                </div>

                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-light whitespace-pre-line">
                    {selectedProduct.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for modal animation and custom button sizes */}
      <style>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5) !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
        }
        
        .swiper-pagination-bullet-active {
          background-color: white !important;
          transform: scale(1.2);
        }
        
        /* Improve touch scrolling on mobile */
        .swiper-slide {
          -webkit-tap-highlight-color: transparent;
          tap-highlight-color: transparent;
        }
        
        /* Prevent horizontal scroll on mobile */
        .swiper-container {
          overflow: hidden;
        }
        
        /* Custom button sizes for mobile */
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
          
          .swiper {
            padding-bottom: 24px !important;
          }
        }
        
        /* Modal scroll improvements */
        @media (max-height: 600px) {
          .fixed {
            align-items: flex-start;
            padding-top: 20px;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
};

export default Kit;
