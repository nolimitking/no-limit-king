import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Kit from "../../assets/Kit.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const CTAHome = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: "69446cec71879644a567fb35",
        quantity: 1,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Added to cart successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to add to cart");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative bg-gradient-to-b from-gray-950 to-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent"></div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[500px]">
          {/* Content Section */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              {/* Minimal badge - Responsive */}

              <span className="text-amber-500 text-xs sm:text-sm font-light tracking-widest uppercase">
                Limited Edition
              </span>

              {/* Minimal headline - Responsive */}
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
                  The Ultimate
                  <span className="block text-amber-500 font-normal mt-1 md:mt-2">
                    Grooming Experience
                  </span>
                </h2>

                {/* Minimal description - Responsive */}
                <p className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed font-light">
                  Elevate your ritual with our premium collection. Crafted for
                  the discerning gentleman.
                </p>
              </div>

              {/* Minimal price - Responsive */}
              <div className="flex items-baseline gap-3 md:gap-4">
                <span className="text-2xl sm:text-3xl font-light text-amber-500">
                  $39.99
                </span>
                <span className="text-gray-500 line-through text-base sm:text-lg">
                  $79.99
                </span>
              </div>

              {/* Minimal button - Responsive */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2 sm:pt-4"
              >
                <button
                  onClick={handleAddToCart}
                  className="group relative w-full sm:w-auto"
                >
                  {/* Button content */}
                  <div className="relative px-4 sm:px-6 py-3 sm:py-4 bg-black rounded-lg flex items-center justify-center border border-gray-800 transition-colors duration-100 hover:border-amber-500/30">
                    <span className="text-white font-medium text-xs sm:text-sm tracking-wider uppercase">
                      Secure Your Kit
                    </span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 sm:ml-3 text-amber-500" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section - Responsive */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black min-h-[300px] sm:min-h-[400px] lg:min-h-full order-1 lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                {/* Subtle glow - Responsive */}
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-amber-500/5 to-transparent rounded-full blur-lg sm:blur-xl"></div>

                {/* Image - Responsive */}
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-lg w-full h-auto shadow-xl sm:shadow-2xl"
                  src={Kit}
                  alt="Premium Grooming Kit"
                  loading="lazy"
                />

                {/* Minimal corner accents - Responsive */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-amber-500/70"></div>
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-amber-500/70"></div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-amber-500/70"></div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-amber-500/70"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTAHome;
