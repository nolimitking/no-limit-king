app.use(express.json());
app.use(cors());
connectDB();

// Redirect non-www to www
app.use((req, res, next) => {
  if (req.hostname === "nolimitking.com") {
    return res.redirect(301, "https://www.nolimitking.com" + req.originalUrl);
  }
  next();
});

// API
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", checkoutRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});
