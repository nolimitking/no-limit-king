import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaRecycle,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-amber-900/30 to-black">
      {/* Decorative top border */}
      <div className="bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-light text-white">
              The Billionaire's Beard
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium grooming essentials for the modern gentleman. Crafted with
              precision, designed for excellence.
            </p>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-3">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                {[
                  { icon: <FaInstagram />, color: "hover:text-pink-500" },
                  { icon: <FaFacebookF />, color: "hover:text-blue-500" },
                  { icon: <FaTiktok />, color: "hover:text-black" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 ${social.color} transition-colors duration-300 border border-gray-700`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-amber-500 text-sm font-medium uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {["Limited Editions"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-amber-500 text-sm font-medium uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {["Contact Us", "About Us"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-amber-500 text-sm font-medium uppercase tracking-wider">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">
                    123 Luxury Avenue
                    <br />
                    Beverly Hills, CA 90210
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-amber-500 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">(888) 888-8888</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-amber-500 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">
                    l@nolimitking.com
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Secure Payment",
                desc: "256-bit SSL encryption",
              },
              {
                icon: <FaTruck />,
                title: "Free Shipping",
                desc: "On orders over $50",
              },
              {
                icon: <FaRecycle />,
                title: "Eco-Friendly",
                desc: "Sustainable packaging",
              },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2"
              >
                <div className="text-amber-500 text-xl">{badge.icon}</div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {badge.title}
                  </div>
                  <div className="text-gray-500 text-xs">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-900"
        >
          <div className="text-gray-500 text-sm text-center">
            © {currentYear} The Billionaire's Beard. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
