import Product from "../../models/Product.js";

const getAllProductsPublished = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const result = await Product.paginate({ isPublished: true }, options);

    res.status(200).json({
      totalProducts: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      products: result.docs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllProductsPublished;
