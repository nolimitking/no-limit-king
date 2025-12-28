import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCart, updateCartQuantity } from "../redux/slices/cartSlice";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    totalPrice,
    loading: loadingCart,
  } = useSelector((state) => state.cart);

  // Fetch cart when sidebar opens
  useEffect(() => {
    if (isOpen) {
      dispatch(getCart());
    }
  }, [isOpen, dispatch]);

  // Helper to get product ID
  const getProductId = (item) =>
    item.product?._id || item.productId || item.product || item._id || null;

  // Update item quantity
  const handleUpdateQuantity = async (item, newQuantity) => {
    const productId = getProductId(item);
    if (!productId) return;

    await dispatch(
      updateCartQuantity({ productId, quantity: newQuantity })
    ).unwrap();
    dispatch(getCart()); // refetch cart to ensure images populate correctly
  };

  // Product image, name, price helpers
  const getProductImage = (item) => item?.product?.images?.[0] || null;
  const getProductName = (item) => item.name || item.product?.name || "Product";
  const getProductPrice = (item) => item.price || item.product?.price || 0;

  // Checkout button handler
  const handleCheckout = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo?.token) {
      toast.error("You must login to proceed to checkout");
      navigate("/login");
      return;
    }

    onClose();
    navigate("/checkout");
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
              {loadingCart ? (
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
                  {items.map((item, index) => {
                    const productId = getProductId(item);
                    const productName = getProductName(item);
                    const productPrice = getProductPrice(item);
                    const productImage = getProductImage(item);

                    return (
                      <motion.div
                        key={item._id || productId || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            {productImage ? (
                              <img
                                src={productImage}
                                alt={productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.classList.add(
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "bg-gray-800"
                                  );
                                }}
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
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-amber-500 truncate">
                              {productName}
                            </h3>
                            <p className="text-amber-500/70 text-sm mt-1">
                              ${productPrice.toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-3">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                                title="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>

                              <span className="text-amber-500 font-bold w-8 text-center">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-500"
                                title="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>

                              <div className="ml-auto text-amber-500 font-bold whitespace-nowrap">
                                ${(productPrice * item.quantity).toFixed(2)}
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => handleUpdateQuantity(item, 0)}
                              className="mt-2 text-xs text-amber-500/70 hover:text-amber-500 flex items-center gap-1"
                              title="Remove item"
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-amber-500/20 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-500 text-lg">Total</span>
                  <span className="text-2xl font-bold text-amber-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={loadingCart || items.length === 0}
                  >
                    Checkout
                  </button>
                </div>

                {/* Item count */}
                <div className="mt-4 text-center text-amber-500/60 text-sm">
                  {items.length} item{items.length !== 1 ? "s" : ""} in cart
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
