import { Truck, Shield, Clock, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description:
        "Complimentary worldwide delivery on all orders. Your luxury items arrive directly to your doorstep.",
      step: "01",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payment",
      description:
        "Bank-level encryption ensures your transactions are protected with the highest security standards.",
      step: "02",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "Every item is meticulously curated and quality-checked to meet our exacting standards.",
      step: "04",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-amber-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-px bg-amber-500"></div>
            <span className="text-amber-500 font-light tracking-widest text-sm uppercase">
              Experience Comfort
            </span>
            <div className="w-16 h-px bg-amber-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            How It <span className="text-amber-500">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
            A seamless journey from selection to delivery, designed with Comfort
            in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Step Number */}
              <div className="absolute z-10 -top-4 -left-4 w-12 h-12 bg-black border border-amber-500/30 rounded-full flex items-center justify-center">
                <span className="text-amber-500 text-xl font-light">
                  {feature.step}
                </span>
              </div>

              {/* Feature Card */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 pt-12 h-full transition-all duration-300 group-hover:border-amber-500/50 group-hover:translate-y-[-4px]">
                {/* Icon Container */}
                <div className="mb-6 flex gap-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 text-amber-500 group-hover:bg-amber-500/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-light text-white flex items-center tracking-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* Content */}

                <p className="text-gray-400 font-light leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 pt-6 border-t border-gray-800 group-hover:border-amber-500/30 transition-colors duration-300">
                  <div className="w-8 h-px bg-amber-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
