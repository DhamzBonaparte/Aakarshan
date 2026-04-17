import {
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Select,
  Button,
  Container,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import "../Styles/OrderForm.scss";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { useEffect } from "react";

export const OrderForm = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    // Triggers the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
      // You can also create a preview URL here if needed
    }
  };
  return (
    <>
      <Navbar />
      <Box component="section" className="order-section">
        <Container maxWidth="md" className="order-container">
          <Box className="form-header">
            <Typography variant="h4" component="h2">
              Create Your Custom Canvas
            </Typography>
            <Typography variant="body1">
              Turn your favorite photos or artwork into stunning canvas prints.
              Choose your size, material, and we'll handle the rest.
            </Typography>
          </Box>

          <Box className="form-card">
            {/* spacing={2} helps keep the layout tight for a 2-column grid */}
            <Grid container spacing={2} className="order-form-grid">
              {/* Full Name */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Full Name</label>
                <TextField
                  fullWidth
                  placeholder="Your name"
                  variant="outlined"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Email</label>
                <TextField
                  fullWidth
                  placeholder="your@email.com"
                  variant="outlined"
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Phone</label>
                <TextField
                  fullWidth
                  placeholder="+977 98xxxxxxxx"
                  variant="outlined"
                />
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">City</label>
                <TextField
                  fullWidth
                  placeholder="Kathmandu"
                  variant="outlined"
                />
              </Grid>

              {/* Street Address - Kept as full width (xs=12) to match image layout */}
              <Grid item xs={12}>
                <label className="input-label">Street Address</label>
                <TextField
                  fullWidth
                  placeholder="Street address"
                  variant="outlined"
                />
              </Grid>

              {/* Postal Code */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Postal Code</label>
                <TextField fullWidth placeholder="44600" variant="outlined" />
              </Grid>

              {/* Canvas Size */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Canvas Size</label>
                <TextField
                  fullWidth
                  placeholder="e.g., 24x36 inches"
                  variant="outlined"
                />
              </Grid>

              {/* Material Dropdown */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Material</label>
                <Select fullWidth defaultValue="Canvas">
                  <MenuItem value="Canvas">Canvas</MenuItem>
                  <MenuItem value="Poster">Matte Poster</MenuItem>
                  <MenuItem value="Framed">Framed Print</MenuItem>
                </Select>
              </Grid>

              {/* Payment Method Dropdown */}
              <Grid item xs={12} sm={6}>
                <label className="input-label">Payment Method</label>
                <Select fullWidth defaultValue="eSewa">
                  <MenuItem value="eSewa">eSewa</MenuItem>
                  <MenuItem value="Khalti">Khalti</MenuItem>
                  <MenuItem value="COD">Cash on Delivery</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <label className="input-label">Upload Your Design</label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <Box
                  className="upload-box"
                  onClick={handleBoxClick}
                  sx={{
                    cursor: "pointer",
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#f9f9f9" },
                  }}
                >
                  <Typography className="upload-text">
                    <CloudUploadOutlined />
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : "Click to upload your artwork"}
                  </Typography>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} className="submit-button-grid">
                <Button fullWidth variant="contained" className="submit-btn">
                  Submit Custom Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
};
