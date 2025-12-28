import image12 from "../assets/image12.png";
import { motion } from "framer-motion";

const Owner = () => {
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/3 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* IMAGE */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.17, 0.55, 0.55, 1],
              delay: 0.2,
            }}
          >
            <div className="relative group">
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <img
                  src={image12}
                  alt="No Limit Bear Founder"
                  className="w-full h-[600px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Decorative frames */}
              <div className="absolute -inset-4 border border-amber-500/20 rounded-3xl group-hover:border-amber-500/40 transition-all duration-500" />
              <div className="absolute -inset-2 border border-amber-500/10 rounded-3xl" />

              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-500 to-amber-600 text-black px-6 py-3 rounded-xl font-bold text-lg shadow-2xl shadow-amber-500/20">
                FOUNDER
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.17, 0.55, 0.55, 1],
            }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-amber-500/70 text-sm font-semibold tracking-widest uppercase">
                The Billionaire Beard Philosophy
              </span>
            </div>

            {/* Title */}
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                Billionaire Beard
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              At its core, Billionaire Beard is more than just a brand{" "}
              <span className="font-semibold text-amber-400">
                — it’s a mindset.
              </span>{" "}
              It’s about embracing a lifestyle defined by discipline, ambition,
              and the courage to challenge the status quo. Those who live the
              Billionaire Beard philosophy are committed to pushing themselves
              to new heights.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Owner;
