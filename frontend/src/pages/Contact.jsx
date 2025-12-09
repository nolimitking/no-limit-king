import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Shield,
  Package,
  CreditCard,
  Truck,
} from "lucide-react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: [
        "support@billionairesbeard.com",
        "orders@billionairesbeard.com",
      ],
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-400",
      note: "24/7 email support",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (888) 888-8888", "Mon-Fri, 9AM-6PM EST"],
      color: "from-gray-800/20 to-gray-900/20",
      iconColor: "text-gray-300",
      note: "Direct line to our team",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Billionaire's Beard HQ", "New York, NY 10001"],
      color: "from-blue-800/20 to-blue-900/20",
      iconColor: "text-blue-300",
      note: "Global shipping available",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["Within 24 hours", "Priority support for orders"],
      color: "from-emerald-800/20 to-emerald-900/20",
      iconColor: "text-emerald-300",
      note: "Usually within 2-4 hours",
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! Our team will respond within 24 hours.");
    e.target.reset();
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:mt-32 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Elite Support
          </h1>
          <p className="sm:text-xl text-lg text-gray-300/80 max-w-2xl mx-auto font-light leading-relaxed">
            Direct access to our premium customer service team. Your
            satisfaction is our priority.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="bg-gradient-to-r from-amber-900/10 to-amber-800/20 rounded-xl p-6 border border-amber-900/30 hover:border-amber-700/20 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} mb-4`}
                  >
                    <info.icon
                      className={`w-6 h-6 ${info.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-300/70 text-sm font-light"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-green-400/70 text-xs font-medium">
                    {info.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-amber-900/10 to-amber-800/20 border border-amber-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Send className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
                <h2 className="text-2xl font-light text-white">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                      placeholder="John Carter"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all appearance-none"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Status</option>
                    <option value="product">Product Inquiry</option>
                    <option value="shipping">Shipping Information</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="wholesale">Wholesale/Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 text-white py-4 uppercase tracking-wider text-sm font-semibold hover:shadow hover:shadow-amber-900/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" strokeWidth={2} />
                    Send Message
                  </span>
                </motion.button>

                <p className="text-center text-gray-400/60 text-xs font-light">
                  We respect your privacy. Your information will never be
                  shared.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-gray-800/30"
        >
          <p className="text-center text-gray-400/60 text-sm font-light max-w-2xl mx-auto">
            At Billionaire's Beard, we believe exceptional products deserve
            exceptional support. Every interaction with our team reflects the
            same quality and attention to detail found in our grooming
            collection. We're here to ensure your experience is flawless.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
