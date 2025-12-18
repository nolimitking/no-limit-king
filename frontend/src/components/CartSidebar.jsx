import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCart,
  updateCartQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { useEffect } from "react";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCart());
    }
  }, [isOpen, dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item if quantity is 0 or less
      dispatch(updateCartQuantity({ productId, quantity: 0 }));
    } else {
      dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full md:w-1/4 bg-black/95 border-l border-amber-500/20 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-amber-500" size={24} />
                <h2 className="text-2xl font-bold text-amber-500">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors"
              >
                <X className="text-amber-500" size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="text-amber-500/40 mb-4" size={64} />
                  <p className="text-amber-500/60 text-lg">
                    Your cart is empty
                  </p>
                  <p className="text-amber-500/40 text-sm mt-2">
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                              <ShoppingBag
                                className="text-amber-500/40"
                                size={24}
                              />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-500">
                            {item.productName}
                          </h3>
                          <p className="text-amber-500/70 text-sm mt-1">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-500"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="text-amber-500 font-bold w-8 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-500"
                            >
                              <Plus size={16} />
                            </button>

                            <div className="ml-auto text-amber-500 font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-amber-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-500 text-lg">Total</span>
                  <span className="text-2xl font-bold text-amber-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 py-3 rounded-xl border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear Cart
                  </button>

                  <button
                    onClick={() => {
                      // Implement checkout logic here
                      console.log("Proceed to checkout");
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold hover:opacity-90 transition-opacity"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
