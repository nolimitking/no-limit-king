import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
  clearError,
  clearProduct,
} from "../../redux/slices/productSlice";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, operationLoading } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Fetch product details on mount
  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));

    return () => dispatch(clearProduct());
  }, [dispatch, id]);

  // Populate form when product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        images: product.images || [],
      });
    }
  }, [product]);

  // Handle errors
  useEffect(() => {
    if (error) {
      showNotification(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    try {
      await dispatch(updateProduct({ id, data: formData })).unwrap();
      showNotification("Product updated successfully", "success");
      navigate(`/admin/product/details/${id}`);
    } catch (err) {
      showNotification(err || "Failed to update product", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50">
          <p
            className={`text-sm font-medium ${
              notification.type === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {notification.message}
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        <Link
          to={`/admin/product/details/${id}`}
          className="inline-flex items-center text-gray-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Product Details
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows="4"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block mb-1 font-semibold">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
              {formData.images.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.images.map((img, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                    >
                      {img.name || img}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={operationLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
            >
              {operationLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Update Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
