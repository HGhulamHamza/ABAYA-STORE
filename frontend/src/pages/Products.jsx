// src/pages/ProductCategory.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { motion } from "framer-motion";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ✅ Dummy products
  const dummyProducts = [
    { id: 1, title: "Classic Black Abaya", price: "Rs 3500", image: "/abaya1.jpg" },
    { id: 2, title: "Elegant Embroidered Abaya", price: "Rs 4200", image: "/abaya2.jpg" },
    { id: 3, title: "Open Front Abaya", price: "Rs 3900", image: "/abaya3.jpg" },
    { id: 4, title: "Modern Pleated Abaya", price: "Rs 4100", image: "/abaya4.jpg" },
    { id: 5, title: "Chiffon Sleeve Abaya", price: "Rs 3800", image: "/abaya5.jpg" },
    { id: 6, title: "Casual Everyday Abaya", price: "Rs 3200", image: "/abaya6.jpg" },
    { id: 7, title: "Luxury Party Abaya", price: "Rs 5000", image: "/abaya7.jpg" },
    { id: 8, title: "Minimalist Abaya", price: "Rs 3400", image: "/abaya8.jpg" },
    { id: 9, title: "Printed Abaya", price: "Rs 3700", image: "/abaya9.jpg" },
    { id: 10, title: "Two-Tone Abaya", price: "Rs 3600", image: "/abaya10.jpg" },
  ];

  useEffect(() => {
    setProducts(dummyProducts);
  }, [category]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filtered = dummyProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const handleAddToCart = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ mt: 12, mb: 6 }}>
      {/* Category Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "700", color: "#333", mb: 6 }}
      >
        {decodeURIComponent(category) || "Products"}
      </Typography>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" sx={{ mb: 6 }}>
        <TextField
          variant="outlined"
          placeholder="Search abayas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          sx={{
            width: { xs: "90%", sm: "60%", md: "40%" },
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="disabled" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Product Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
        gap={4}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "370px", // ✅ uniform height
              transition: "0.3s",
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            />

            {/* Content */}
            <Box p={2} display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1}>
              <Box>
                {/* Title */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "600",
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </Typography>

                {/* Price + Cart */}
                <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: "700", color: "#006400" }}>
                    {product.price}
                  </Typography>
                  <IconButton onClick={handleAddToCart}>
                    <ShoppingCart sx={{ color: "#006400" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Abaya added to cart successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
