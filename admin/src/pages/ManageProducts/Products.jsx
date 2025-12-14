import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  clearError,
} from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const Products = () => {
  const dispatch = useDispatch();

  const {
    items: products = [],
    loading,
    error,
    totalPages,
    currentPage,
    hasNextPage,
    hasPrevPage,
    totalProducts,
  } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const isAdmin = userInfo?.role === "admin";

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 12 }));
  }, [dispatch, page]);

  // Handle error
  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await dispatch(deleteProduct(productToDelete._id)).unwrap();
      // Refetch products after deletion
      dispatch(fetchProducts({ page, limit: 12 }));
      setOpenDeleteDialog(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-600">
              Showing {products.length} of {totalProducts} products
            </p>
          </div>

          {isAdmin && (
            <Link
              to="/admin/add/product"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <FaPlus className="inline mr-2" />
              Add Product
            </Link>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={product.images}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded"
                />

                <h3 className="mt-3 font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    <MdCategory className="inline mr-1" />
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/admin/product/details/${product._id}`}
                    className="text-blue-600 text-sm"
                  >
                    <FaEye className="inline mr-1" />
                    View Details
                  </Link>

                  {isAdmin && (
                    <div className="flex gap-2 items-end">
                      <Link
                        to={`/admin/product/edit/${product._id}`}
                        className="text-yellow-600"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => {
                          setProductToDelete(product);
                          setOpenDeleteDialog(true);
                        }}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded">
            <FaBoxOpen className="mx-auto text-4xl text-gray-400 mb-4" />
            <p>No products found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              <FaChevronLeft />
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {openDeleteDialog && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{productToDelete?.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setOpenDeleteDialog(false);
                  setProductToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
