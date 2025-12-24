import Order from "../../models/Order.js";

const orders = async (req, res) => {
  try {
    // Get page and limit from query, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Pagination options
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: [
        { path: "user", select: "name email" },
        { path: "items.product", select: "name price" },
      ],
    };

    // Get paginated orders
    const result = await Order.paginate({}, options);

    // Return structured response
    res.status(200).json({
      orders: result.docs, // array of orders
      ordersPage: result.page, // current page
      ordersTotalPages: result.totalPages, // total pages
      ordersTotalDocs: result.totalDocs, // total orders
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default orders;
