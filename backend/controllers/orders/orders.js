import Order from "../../models/Order.js";

const orders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Pagination options
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: ["user", "course"],
    };

    const orders = await Order.paginate({}, options);

    if (!orders) {
      return res.status(400).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default orders;
