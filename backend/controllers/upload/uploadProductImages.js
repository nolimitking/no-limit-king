export const uploadProductImages = async (req, res) => {
  res.json({
    message: "Images uploaded successfully",
    image: req.imageURLs,
  });
};
