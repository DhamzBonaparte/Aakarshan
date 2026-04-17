import React from "react";
import { Box, Typography, Grid, Button, Container } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import "../Styles/ProductCard.scss";

const products = [
  {
    id: 1,
    title: "Abstract Horizons",
    desc: "Warm abstract composition with flowing textures and earth tones",
    sizes: "A4, A3, 24x36",
    price: "4,500",
    img: "https://plus.unsplash.com/premium_photo-1664013263421-91e3a8101259?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Coastal Whispers",
    desc: "Soft blues and greens inspired by ocean waves",
    sizes: "A3, 18x24, 24x36",
    price: "3,800",
    img: "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=764&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Ember Flow",
    desc: "Vibrant red and orange abstract with dynamic movement",
    sizes: "12x12, A3, 24x24",
    price: "5,200",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=745&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Spectrum Dreams",
    desc: "Multi-colored abstract with bold strokes and energy",
    sizes: "A4, A3, 18x24",
    price: "4,200",
    img: "https://plus.unsplash.com/premium_photo-1675378165346-5f6c3959f0d2?q=80&w=688&auto=format&fit=crop",
  },
];

export const ProductCard = () => {
  const navigate=useNavigate();
  return (
    <Box component="section" className="product-section">
      <Container maxWidth="lg">
        <Box className="section-header">
          <Typography variant="h2">Ready-Made Collection</Typography>
          <Typography variant="body1">
            Explore our curated collection of canvas art designs, available in
            multiple sizes and materials
          </Typography>
        </Box>

        <Grid container spacing={2} className="products-grid">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Box className="product-card">
                <Box className="image-container">
                  <img src={product.img} alt={product.title} />
                </Box>

                <Box className="product-info">
                  <Typography variant="h6" className="product-title">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" className="product-desc">
                    {product.desc}
                  </Typography>
                  <Typography variant="caption" className="product-sizes">
                    {product.sizes}
                  </Typography>

                  <Box className="card-footer">
                    <Typography className="price">NPR {product.price}</Typography>
                    <Button
                      variant="contained"
                      className="add-btn"
                      startIcon={<AddShoppingCartOutlined />}
                       onClick={()=>{navigate('/catalog')}}
                    >
                      Go to collections
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};