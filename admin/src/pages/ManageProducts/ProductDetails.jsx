import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchProductDetails,
  clearError,
  clearProduct,
} from "../../redux/slices/productSlice";
import {
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, operationLoading } = useSelector(
    (state) => state.products
  );

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const isAdmin = userInfo?.role === "admin";

  // Fetch product details on mount
  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
    return () => dispatch(clearProduct());
  }, [dispatch, id]);

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

  const handleEditClick = () => {
    navigate(`/admin/product/edit/${id}`);
  };

  const handleDeleteConfirm = () => {
    showNotification("Delete functionality not implemented", "error");
    setOpenDeleteDialog(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // Product not found
  if (!product && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Product not found</p>
          <Link to="/products" className="text-blue-600 mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [""];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Notification */}
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

      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/admin/products"
          className="inline-flex items-center text-gray-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to products
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 object-cover rounded cursor-pointer border ${
                      selectedImage === i
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex justify-between mb-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={handleEditClick}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setOpenDeleteDialog(true)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center mb-6">
              <TbCurrencyDollar className="text-2xl" />
              <span className="text-4xl font-bold">
                {Number(product.price).toFixed(2)}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <MdDescription className="mr-2 text-gray-500" />
                <h3 className="font-semibold">Description</h3>
              </div>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="flex items-center mb-6">
              <MdCategory className="mr-2 text-gray-500" />
              <span>{product.category || "Uncategorized"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {openDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-bold mb-4">Delete Product</h3>
            <p className="mb-6">
              Are you sure you want to delete <strong>{product.name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDeleteDialog(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {operationLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
