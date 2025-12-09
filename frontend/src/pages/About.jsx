import { motion } from "framer-motion";
import {
  Droplets,
  Flame,
  ShowerHead,
  Leaf,
  Gem,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const products = [
    {
      icon: Droplets,
      title: "Billionaire Beard Oil",
      color: "from-amber-500 to-amber-600",
      iconColor: "text-amber-400",
      description:
        "Rapid growth formula with 18 natural & organic oils. Promotes repair, softening, and emits a luxurious scent.",
      keyBenefits: [
        "Argan & Jojoba blend",
        "Vitamin E enriched",
        "Luxury fragrance",
      ],
      tag: "Elite Hydration",
    },
    {
      icon: Flame,
      title: "Premium Straightener",
      color: "from-gray-800 to-gray-900",
      iconColor: "text-amber-300",
      description:
        "Professional-grade straightening tool with heat protection technology for alpha males.",
      keyBenefits: [
        "Temperature controlled",
        "Heat protectant safe",
        "Professional results",
      ],
      tag: "Alpha Grooming",
    },
    {
      icon: ShowerHead,
      title: "Billionaire Beard Wash",
      color: "from-blue-800 to-blue-900",
      iconColor: "text-blue-300",
      description:
        "Deep cleansing formula with botanical extracts. Hydrates, softens, and detangles.",
      keyBenefits: ["Apricot & Aloe blend", "Organic rosemary", "Rich lather"],
      tag: "Pure Cleanse",
    },
    {
      icon: Leaf,
      title: "Beard Conditioner",
      color: "from-emerald-800 to-emerald-900",
      iconColor: "text-emerald-300",
      description:
        "100% natural conditioner with argan, jojoba, and green tea for ultimate softness.",
      keyBenefits: [
        "Provitamin B5",
        "Sandalwood scent",
        "2-3 minute treatment",
      ],
      tag: "Natural Softening",
    },
    {
      icon: Gem,
      title: "Beard Balm",
      color: "from-purple-800 to-purple-900",
      iconColor: "text-purple-300",
      description:
        "Daily conditioner with champaca essential oil for fresh, luxurious fragrance.",
      keyBenefits: [
        "Champaca essential oil",
        "All-day conditioning",
        "Luxury aroma",
      ],
      tag: "Daily Essential",
    },
  ];

  const corePrinciples = [
    {
      icon: Sparkles,
      title: "Premium Formulation",
      description:
        "Every product features carefully curated natural ingredients for optimal results.",
    },
    {
      icon: Shield,
      title: "Elite Performance",
      description:
        "Designed for the discerning gentleman who demands excellence in grooming.",
    },
    {
      icon: Zap,
      title: "Rapid Results",
      description:
        "Experience noticeable improvements in beard health and appearance.",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen sm:mt-32 py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            The Billionaire's Collection
          </h1>
          <p className="text-xl text-gray-300/80 max-w-3xl mx-auto font-light leading-relaxed">
            An elite grooming system crafted for perfection. Each product is
            meticulously formulated with premium natural ingredients for the
            ultimate beard care experience.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-black rounded-2xl p-6 border border-amber-500/40 hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/10">
                {/* Icon */}
                <div
                  className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${product.color} w-fit`}
                >
                  <product.icon
                    className={`w-8 h-8 ${product.iconColor}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Tag */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-200 mb-3">
                  {product.tag}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300/80 mb-4 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Key Benefits */}
                <ul className="space-y-2">
                  {product.keyBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Principles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20 mt-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-4">
              Our Core Principles
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What sets The Billionaire's Collection apart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {corePrinciples.map((principle, index) => (
              <div
                key={principle.title}
                className="text-center p-6 rounded-2xl bg-black border border-amber-500/40"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-500/20 mb-6">
                  <principle.icon
                    className="w-7 h-7 text-amber-400"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-300/80 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto bg-black rounded-2xl p-8 border border-amber-500/40">
            <h3 className="text-2xl font-light text-white mb-4">
              Experience the Elite Grooming Kit
            </h3>
            <p className="text-gray-300/80 mb-6 font-light leading-relaxed">
              Discover our Billionaire Beard Elite Grooming Kit — the premium
              edition made for true alpha beards.
            </p>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 text-white px-8 py-3 uppercase tracking-wider text-sm font-semibold hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300"
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
