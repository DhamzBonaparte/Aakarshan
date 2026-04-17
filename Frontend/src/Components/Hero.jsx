import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ShoppingBagOutlined, PaletteOutlined } from "@mui/icons-material";
import "../Styles/Hero.scss";
import { useNavigate } from "react-router-dom";


export const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box className="hero-container">
      {/* Background Image Wrapper */}
      <Box className="hero-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1767614373251-94259ec635f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW52YXMlMjB3YWxsJTIwYXJ0JTIwbGl2aW5nJTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3NTkxMDcyMXww&ixlib=rb-4.1.0&q=80&w=1080" // Add your image URL here
          alt="Canvas art background"
          className="hero-bg-image"
        />
        <div className="hero-overlay" />
      </Box>

      <Box className="hero-content">
        <Typography variant="h1" className="hero-title">
          Aakarshan
        </Typography>

        <Typography variant="h5" className="hero-subtitle">
          Transform your space with custom canvas art
        </Typography>

        <Box className="button-group">
          <Button
            variant="contained"
            className="hero-button btn-primary"
            startIcon={<ShoppingBagOutlined />}
            href="#designs" 
            onClick={() => navigate("/catalog")}
          >
            Browse Designs
          </Button>

          <Button
            variant="outlined"
            className="hero-button btn-secondary"
            startIcon={<PaletteOutlined />}
            href="#custom"
          >
            Custom Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
