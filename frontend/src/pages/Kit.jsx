import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Bag from "../assets/Bag.png";
import Billionaire_Beard_conditioner from "../assets/billionaire_beard_conditioner.png";
import Billionaire_Beard_straightener_brush from "../assets/billionaire_beard_straightener_brush.png";
import Billionaire_Beard_Oil from "../assets/billionaire_beard_oil.png";
import Billionaire_Beard_Wash from "../assets/billionaire_beard_wash.png";
import Billionaire_Beard_Balm from "../assets/billionaire_beard_balm.png";

// Product data with full descriptions
const products = [
  {
    id: 1,
    name: "Gift Bag – No Limit King Billionaire Beard Kit",
    image: Bag,
    fullDescription:
      "A premium, stylish gift bag crafted to match the luxury of the No Limit King Billionaire Beard Kit. Durable, sleek, and designed for unforgettable gifting — the perfect finishing touch for the ultimate beard-care experience.",
  },
  {
    id: 2,
    name: "Billionaire Beard Conditioner",
    image: Billionaire_Beard_conditioner,
    fullDescription:
      "Made with 100% natural ingredients to cleanse, soften, and deeply moisturize your beard. Enriched with Argan oil, Jojoba oil, aloe, green tea, and Provitamin B5, it leaves a luxurious scent with notes of sandalwood and champaca. After shampooing, massage through your beard, leave for 2–3 minutes, then rinse. For best results, pair with the Billionaire Beard Oil.",
  },
  {
    id: 3,
    name: "Beard Straightener Brush",
    image: Billionaire_Beard_straightener_brush,
    fullDescription:
      "The Billionaire Beard Straightener Brush is a premium heated comb designed for thicker and longer beards. For best results, wash and dry your beard thoroughly, apply a heat protectant, and section the hair before straightening. Glide the brush slowly from roots to ends without pausing too long to prevent heat damage. Finish with beard oil or balm for a smooth, polished look. Use sparingly to maintain beard health or consult a professional barber for expert styling.",
  },
  {
    id: 4,
    name: "Billionaire Beard Oil",
    image: Billionaire_Beard_Oil,
    fullDescription:
      "Designed to promote rapid growth, repair damage, and provide softening and moisturizing benefits to your beard, leaving you feeling refreshed and emitting a luxurious scent. INGREDIENTS: Our formulation objective is to provide a rich beard oil abundant in natural and organic ingredients. Comprised of Argan, Jojoba, Apricot kernel, Sweet almond, Grapeseed, Vitamin E, Coconut, Avocado, Castor, Sunflower, Eucalyptus, Rosemary essential oils, Champaca, Rose, Lemon citrus, Black pepper, Sandalwood, and Laurel leaf. ",
  },
  {
    id: 5,
    name: "Billionaire Beard Wash",
    image: Billionaire_Beard_Wash,
    fullDescription:
      "is expertly formulated to thoroughly cleanse, hydrate, soften, and detangle your beard. About this item: Our unique blend of botanical ingredients, including apricot and aloe, works in harmony with a carefully crafted blend of natural oils, featuring organic rosemary, coconut oil, jojoba, argan, and avocado oil. Our Nolimit beard wash set provides a deep cleanse and nourishment. Simply apply a small amount of shampoo, add water, massage into your beard, and the rich lather will take care of the rest.",
  },
  {
    id: 6,
    name: "Beard balm",
    image: Billionaire_Beard_Balm,
    fullDescription:
      "No Limit Billionaire Beard Balm most used daily Conditioner and softener with champaca essential oil Smelling fresh and luxurious.",
  },
];

const Kit = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleCloseOverlay = () => {
    setSelectedProduct(null);
  };

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  };

  // Get the background image based on active slide
  const getBackgroundImage = () => {
    const product = products[activeSlideIndex % products.length];
    return product?.image || Bag; // Fallback to first image
  };

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
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Luxury Header */}
        <div className="text-center sm:mb-8 mb-[-24px]">
          <h1 className="text-4xl md:text-5xl font-semi-bold text-white mb-4">
            Essential Collection
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-light">
            Discover our curated selection of premium essentials — swipe through
            the collection to explore each item.
          </p>
        </div>

        {/* Cover Flow Slider */}
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
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
            pagination={{
              clickable: true,
            }}
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
                  {/* Image Container */}
                  <div className="h-120 sm:h-150">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transform transition-transform duration-300 hover:scale-105"
                    />
                    {/* Click hint overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white text-sm font-light tracking-wider bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-normal text-white text-center tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Updated with mobile sizing */}
          <div className="swiper-button-prev top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-100"></div>
          <div className="swiper-button-next top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 [--swiper-navigation-sides-offset:18rem] [--swiper-navigation-color:white] scale-75 md:scale-100"></div>

          {/* Custom Pagination */}
          <div className="swiper-pagination bottom-6"></div>
        </div>
      </div>

      {/* Full Screen Overlay Modal */}
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
            {/* Close Button */}
            <button
              onClick={handleCloseOverlay}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">
                ×
              </span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain p-8 lg:p-12"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 lg:p-12 overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 text-lg font-light italic mb-4">
                    {selectedProduct.title}
                  </p>
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
        }
        
        .swiper-pagination-bullet-active {
          background-color: white !important;
          transform: scale(1.2);
        }
        
        /* Custom button sizes for mobile */
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 40px !important;
            height: 40px !important;
          }
          
          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 20px !important;
          }
        }
        
        /* For very small screens */
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 36px !important;
            height: 36px !important;
          }
          
          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 18px !important;
          }
          
          /* Adjust side offset for mobile */
          .swiper-button-prev {
            left: -12px !important;
          }
          
          .swiper-button-next {
            right: -12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Kit;
