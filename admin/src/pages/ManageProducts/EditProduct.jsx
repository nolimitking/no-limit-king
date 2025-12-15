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
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, operationLoading } = useSelector(
    (state) => state.products
  );

  const [formDataState, setFormDataState] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [images, setImages] = useState([]); // new images

  // Fetch product details
  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
    return () => dispatch(clearProduct());
  }, [dispatch, id]);

  // Populate form
  useEffect(() => {
    if (product) {
      setFormDataState({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
      });
    }
  }, [product]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formDataState.name);
    formData.append("description", formDataState.description);
    formData.append("price", formDataState.price);
    formData.append("category", formDataState.category);

    images.forEach((img) => formData.append("images", img));

    try {
      await dispatch(updateProduct({ id, data: formData })).unwrap();
      toast.success("Product updated successfully");
      navigate(`/admin/product/details/${id}`);
    } catch (err) {
      toast.error(err || "Update failed");
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
                value={formDataState.name}
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
                value={formDataState.description}
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
                value={formDataState.price}
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
                value={formDataState.category}
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
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="w-full"
              />

              {product?.images?.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="product"
                      className="w-20 h-20 object-cover rounded"
                    />
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
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Updating...
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
