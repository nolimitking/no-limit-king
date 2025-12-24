import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
  clearError,
  clearProduct,
} from "../../redux/slices/productSlice";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const EditProduct = () => {
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const { product, loading, error, operationLoading } = useSelector(
    (state) => state.products
  );

  // Local State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [newImages, setNewImages] = useState([]);

  // ==================== Effects ====================

  // Fetch product details
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  // Populate form when product data is available
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // ==================== Handlers ====================

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = prepareFormData();

      await dispatch(updateProduct({ id, data: payload })).unwrap();

      toast.success("Product updated successfully");
      navigate(`/admin/product/details/${id}`);
    } catch (err) {
      toast.error(err?.message || "Failed to update product");
    }
  };

  // ==================== Helper Functions ====================

  const prepareFormData = () => {
    // If new images are uploaded, use FormData
    if (newImages.length > 0) {
      const formData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      newImages.forEach((image) => {
        formData.append("images", image);
      });

      return formData;
    }

    // Otherwise, send as JSON
    return {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category.trim(),
    };
  };

  // ==================== Render States ====================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FaSpinner className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // ==================== Main Render ====================

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* Navigation */}
        <Link
          to={`/admin/product/details/${id}`}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Product Details
        </Link>

        {/* Main Content */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                required
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter product category"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Add New Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full cursor-pointer rounded-lg border border-gray-300 p-2.5 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Select multiple images to upload
              </p>

              {/* Existing Images Preview */}
              {product?.images?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Existing Images
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={operationLoading}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {operationLoading ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Updating Product...
                </>
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
