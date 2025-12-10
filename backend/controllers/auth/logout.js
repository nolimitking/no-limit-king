const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

export default logout;
