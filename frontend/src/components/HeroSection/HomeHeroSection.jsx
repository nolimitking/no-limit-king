import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import Kit from "../../assets/Kit.GIF";
import { toast } from "react-toastify";

const HomeHeroSection = () => {
  const dispatch = useDispatch();

  // Assuming you have a product ID for this kit
  const productId = "premium-beard-kit-001";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: "69446cec71879644a567fb35",
        quantity: 1,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Added to cart successfully!");
      } else {
        toast.error("Failed to add to cart");
      }
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center sm:mt-32 px-4 py-20 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Luxury Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              The Billionaire's Beard
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif text-amber-500">
              Elite Grooming Kit
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <h2 className="text-3xl md:text-5xl font-serif italic text-amber-500">
                Premium Edition
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </motion.div>
          </motion.div>

          {/* Centered Kit Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-3xl w-full"
          >
            {/* Floating glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(245, 158, 11, 0.2)",
                  "0 0 90px rgba(245, 158, 11, 0.3)",
                  "0 0 60px rgba(245, 158, 11, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-8 bg-amber-900/40 blur-2xl rounded-full"
            />

            {/* Image container */}
            <div className="relative group">
              <div className="absolute sm:-inset-4 -inset-3 border border-amber-500/40 rounded-2xl transform group-hover:scale-102 transition-transform duration-500"></div>

              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-auto rounded-xl shadow-2xl relative z-10"
                src={Kit}
                alt="The Billionaire's Beard Kit - Premium Grooming Collection"
              />
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto font-light">
              The ultimate grooming system for the discerning gentleman. <br />
              <span className="text-gray-300">
                Crafted for perfection, designed for excellence.
              </span>
            </p>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl text-amber-500 bg-amber-500/20 px-2 py-2 rounded-xl">
                  Sale $39.99
                </span>
                <span className="text-xl font-light text-gray-400 line-through">
                  $79.99
                </span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {/* ADD TO CARD */}
              <button
                onClick={handleAddToCart}
                className="relative rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-4 rounded-xl text-sm font-medium overflow-hidden group"
              >
                <span className="relative z-10 text-black/80">
                  Add To Cart - $39.99
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
