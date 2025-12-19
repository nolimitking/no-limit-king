import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCart,
  updateCartQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalPrice, loading } = useSelector((state) => state.cart);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCart());
    }
  }, [isOpen, dispatch]);

  // Debug function to see item structure
  const debugItemStructure = (item, index) => {
    console.log(`\n🔍 Cart Item ${index} Structure:`);
    console.log("Full item:", item);
    console.log("Item _id (cart item ID):", item._id);
    console.log("Item product:", item.product);
    console.log("Item productId:", item.productId);

    if (item.product && typeof item.product === "object") {
      console.log("Product is an object with keys:", Object.keys(item.product));
      console.log("Product _id:", item.product._id);
      console.log("Product name:", item.product.name);
    } else if (item.product) {
      console.log("Product is ID string:", item.product);
    }

    console.log("Item quantity:", item.quantity);
    console.log("Item price:", item.price);
  };

  const getProductId = (item) => {
    // Try different possibilities based on your data structure
    if (item.product?._id) {
      return item.product._id; // Populated product object
    } else if (item.productId) {
      return item.productId; // Direct productId field
    } else if (item.product) {
      return item.product; // Just the product ID string
    } else if (item._id) {
      console.warn("⚠️ Using cart item ID as fallback. This might be wrong!");
      return item._id; // Fallback (cart item ID)
    }

    console.error("❌ Could not find product ID in item:", item);
    return null;
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    const productId = getProductId(item);

    if (!productId) {
      console.error("Cannot update quantity: No product ID found", item);
      alert("Error: Could not update item quantity");
      return;
    }

    console.log(
      `🔄 Updating: Product ID=${productId}, New Quantity=${newQuantity}`
    );

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

  // Get image URL - handle different data structures
  const getProductImage = (item) => {
    if (item.productImage) return item.productImage;
    if (item.product?.image) return item.product.image;
    if (item.image) return item.image;
    return null;
  };

  // Get product name
  const getProductName = (item) => {
    if (item.name) return item.name;
    if (item.product?.name) return item.product.name;
    return "Product";
  };

  // Get product price
  const getProductPrice = (item) => {
    if (item.price) return item.price;
    if (item.product?.price) return item.product.price;
    return 0;
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
              <div className="flex items-center gap-2">
                {/* Debug toggle */}
                {process.env.NODE_ENV === "development" && (
                  <button
                    onClick={() => setDebugMode(!debugMode)}
                    className="px-2 py-1 text-xs bg-amber-500/20 text-amber-500 rounded"
                  >
                    {debugMode ? "Hide Debug" : "Debug"}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors"
                >
                  <X className="text-amber-500" size={24} />
                </button>
              </div>
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
                  {items.map((item, index) => {
                    const productId = getProductId(item);
                    const productName = getProductName(item);
                    const productPrice = getProductPrice(item);
                    const productImage = getProductImage(item);

                    // Debug output if enabled
                    if (debugMode) {
                      debugItemStructure(item, index);
                    }

                    return (
                      <motion.div
                        key={item._id || productId || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
                      >
                        {/* Debug info */}
                        {debugMode && (
                          <div className="mb-2 p-2 bg-black/50 rounded text-xs">
                            <div className="text-amber-300">
                              Product ID: {productId}
                            </div>
                            <div className="text-gray-400">
                              Cart Item ID: {item._id}
                            </div>
                            <div className="text-gray-400">
                              Type: {typeof item.product}
                            </div>
                          </div>
                        )}

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
                            ) : null}
                            {!productImage && (
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
                            <div className="flex items-center gap-3 mt-3">
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
                              <Trash2 size={12} />
                              Remove
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
                    onClick={handleClearCart}
                    className="flex-1 py-3 rounded-xl border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <Trash2 size={18} />
                    Clear Cart
                  </button>

                  <button
                    onClick={() => {
                      console.log("Proceed to checkout");
                      // Implement checkout logic here
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    disabled={loading || items.length === 0}
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
